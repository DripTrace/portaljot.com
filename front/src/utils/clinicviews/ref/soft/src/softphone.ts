// 3.2 (audio logs don't end after hangup)
import EventEmitter from "events";
import net from "net";
import waitFor from "wait-for-async";
import * as fs from "fs";
import * as wav from "wav";
import WebSocket from "ws";
import dgram from "dgram";
import { RtpHeader, RtpPacket } from "werift-rtp";
import type { OutboundMessage } from "./sip-message";
import { InboundMessage, RequestMessage, ResponseMessage } from "./sip-message";
import { branch, generateAuthorization, randomInt, uuid } from "./utils";
import InboundCallSession from "./call-session/inbound";
import OutboundCallSession from "./call-session/outbound";
import SipInfoResponse from "@rc-ex/core/lib/definitions/SipInfoResponse";
import type { Server as HttpServer } from "http";
import path from "path";

class Softphone extends EventEmitter {
    private webSocketServer: WebSocket.Server | null = null;
    private activeWebSockets: Set<WebSocket> = new Set();
    public sipInfo: SipInfoResponse;
    public client: net.Socket;
    public fakeDomain: string;
    public fakeEmail: string;
    public lastInviteMessage?: InboundMessage;
    public currentCallSession?: InboundCallSession | OutboundCallSession;
    public socket!: dgram.Socket;
    private intervalHandle: NodeJS.Timeout | null = null;
    private audioProcessingInterval: NodeJS.Timeout | null = null;
    private connected = false;
    private audioLogFolder: string = path.join(
        process.cwd(),
        "src/data/llpmg/calls"
    );
    private wavWriter: wav.FileWriter | null = null;
    private isCallActive: boolean = false;

    constructor(sipInfo: SipInfoResponse) {
        super();
        this.sipInfo = sipInfo;
        this.fakeDomain = uuid() + ".invalid";
        this.fakeEmail = uuid() + "@" + this.fakeDomain;

        if (!this.sipInfo.domain) {
            this.sipInfo.domain = "sip.ringcentral.com";
        }
        if (!this.sipInfo.outboundProxy) {
            this.sipInfo.outboundProxy = "sip112-1241.ringcentral.com:5091";
        }

        this.client = new net.Socket();
        const tokens = this.sipInfo.outboundProxy.split(":");
        this.client.connect(parseInt(tokens[1], 10), tokens[0], () => {
            this.connected = true;
            console.log("[Softphone] SIP client connected");
        });

        let cache = "";
        this.client.on("data", (data) => {
            cache += data.toString("utf-8");
            if (!cache.endsWith("\r\n")) {
                return;
            }

            const tempMessages = cache
                .split("\r\nContent-Length: 0\r\n\r\n")
                .filter((message) => message.trim() !== "");
            cache = "";
            for (let i = 0; i < tempMessages.length; i++) {
                if (!tempMessages[i].includes("Content-Length: ")) {
                    tempMessages[i] += "\r\nContent-Length: 0";
                }
            }
            for (const message of tempMessages) {
                const inboundMsg = InboundMessage.fromString(message);
                if (inboundMsg) {
                    console.log(
                        "[Softphone] Received SIP message:",
                        inboundMsg.subject
                    );
                    this.emit("message", inboundMsg);
                }
            }
        });
    }

    public initializeWebSocket(server: HttpServer) {
        this.webSocketServer = new WebSocket.Server({ server });

        this.webSocketServer.on("connection", (ws: WebSocket) => {
            console.log("[Softphone] WebSocket client connected");
            this.activeWebSockets.add(ws);

            ws.on("message", (message: WebSocket.RawData) => {
                const data = JSON.parse(message.toString());
                if (
                    data.type === "join" &&
                    data.callId &&
                    this.currentCallSession
                ) {
                    if (this.currentCallSession.callId === data.callId) {
                        this.currentCallSession.setWebSocket(ws);
                    }
                }
            });

            ws.on("close", () => {
                console.log("[Softphone] WebSocket client disconnected");
                this.activeWebSockets.delete(ws);
            });
        });
    }

    public async register() {
        if (!this.connected) {
            await waitFor({ interval: 100, condition: () => this.connected });
        }
        const sipRegister = async () => {
            const requestMessage = new RequestMessage(
                `REGISTER sip:${this.sipInfo.domain} SIP/2.0`,
                {
                    "Call-Id": uuid(),
                    Contact: `<sip:${this.fakeEmail};transport=tcp>;expires=600`,
                    From: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>;tag=${uuid()}`,
                    To: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>`,
                    Via: `SIP/2.0/TCP ${this.fakeDomain};branch=${branch()}`,
                }
            );
            const inboundMessage = await this.send(requestMessage, true);
            if (
                inboundMessage &&
                inboundMessage.subject.startsWith("SIP/2.0 200 ")
            ) {
                console.log("[Softphone] SIP registration successful");
                return;
            }
            const wwwAuth =
                inboundMessage?.headers["Www-Authenticate"] ||
                inboundMessage?.headers["WWW-Authenticate"];
            if (wwwAuth) {
                const nonce = wwwAuth.match(/, nonce="(.+?)"/)?.[1];
                if (nonce) {
                    const newMessage = requestMessage.fork();
                    newMessage.headers.Authorization = generateAuthorization(
                        this.sipInfo,
                        nonce,
                        "REGISTER"
                    );
                    await this.send(newMessage);
                    console.log(
                        "[Softphone] SIP registration with authentication successful"
                    );
                }
            }
        };
        await sipRegister();
        this.intervalHandle = setInterval(sipRegister, 3 * 60 * 1000);
        this.on("message", (inboundMessage: InboundMessage) => {
            if (inboundMessage.subject.startsWith("INVITE sip:")) {
                console.log("[Softphone] Incoming call detected");
                this.lastInviteMessage = inboundMessage;
                this.emit("invite", inboundMessage);
            } else if (inboundMessage.subject.startsWith("BYE")) {
                console.log("[Softphone] Received BYE message, ending call");
                this.handleRemoteHangup();
            } else {
                console.log(
                    "[Softphone] there currently is no inbound message"
                );
            }
        });
    }

    public enableDebugMode() {
        this.on("message", (message: InboundMessage) =>
            console.log(
                `[Softphone] Receiving...(${new Date()})\n` + message.toString()
            )
        );
        const tcpWrite = this.client.write.bind(this.client);
        this.client.write = (message: string | Uint8Array) => {
            console.log(`[Softphone] Sending...(${new Date()})\n` + message);
            return tcpWrite(message);
        };
    }

    public revoke() {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
        }
        this.removeAllListeners();
        this.client.removeAllListeners();
        this.client.destroy();
        this.cleanupCall();
        this.closeAllWebSockets();
        console.log("[Softphone] SIP client revoked");
    }

    private closeAllWebSockets() {
        for (const ws of this.activeWebSockets) {
            ws.close();
        }
        this.activeWebSockets.clear();
    }

    public send(message: OutboundMessage, waitForReply = false) {
        this.client.write(message.toString());
        if (!waitForReply) {
            return Promise.resolve(undefined);
        }
        return new Promise<InboundMessage>((resolve, reject) => {
            const messageListener = (inboundMessage: InboundMessage) => {
                if (inboundMessage.headers.CSeq !== message.headers.CSeq) {
                    return;
                }
                if (inboundMessage.subject.startsWith("SIP/2.0 100 ")) {
                    return;
                }
                this.off("message", messageListener);
                resolve(inboundMessage);
            };
            this.on("message", messageListener);
            setTimeout(
                () =>
                    reject(
                        new Error("[Softphone] No response received in time")
                    ),
                5000
            );
        });
    }

    public async answer(inviteMessage: InboundMessage) {
        console.log("[Softphone] Answering incoming call");
        const inboundCallSession = new InboundCallSession(this, inviteMessage);
        await inboundCallSession.answer();
        this.currentCallSession = inboundCallSession;
        this.isCallActive = true;
        this.startRecording(inboundCallSession.callId);
        this.startAudioProcessing();
        return inboundCallSession;
    }

    public async decline(inviteMessage: InboundMessage) {
        console.log("[Softphone] Declining incoming call");
        const newMessage = new ResponseMessage(inviteMessage, 603);
        await this.send(newMessage);
    }

    public async call(callee: number, callerId?: number) {
        console.log(`[Softphone] Initiating outgoing call to ${callee}`);
        const offerSDP = `
v=0
o=- ${randomInt()} 0 IN IP4 127.0.0.1
s=rc-softphone-ts
c=IN IP4 127.0.0.1
t=0 0
m=audio ${randomInt()} RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-15
a=sendrecv
  `.trim();

        const inviteMessage = new RequestMessage(
            `INVITE sip:${callee}@${this.sipInfo.domain} SIP/2.0`,
            {
                "Call-Id": uuid(),
                Contact: `<sip:${this.fakeEmail};transport=tcp>;expires=600`,
                From: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>;tag=${uuid()}`,
                To: `<sip:${callee}@${this.sipInfo.domain}>`,
                Via: `SIP/2.0/TCP ${this.fakeDomain};branch=${branch()}`,
                "Content-Type": "application/sdp",
            },
            offerSDP
        );

        if (callerId) {
            inviteMessage.headers["P-Asserted-Identity"] =
                `sip:${callerId}@${this.sipInfo.domain}`;
        }

        try {
            console.log(`[Softphone] Sending initial INVITE message`);
            const inboundMessage = await this.send(inviteMessage, true);

            if (inboundMessage) {
                const proxyAuthenticate =
                    inboundMessage.headers["Proxy-Authenticate"] ||
                    inboundMessage.headers["proxy-authenticate"];
                if (proxyAuthenticate) {
                    const nonceMatch =
                        proxyAuthenticate.match(/nonce="([^"]+)"/);
                    const nonce = nonceMatch ? nonceMatch[1] : null;

                    if (nonce) {
                        const newMessage = inviteMessage.fork();
                        newMessage.headers["Proxy-Authorization"] =
                            generateAuthorization(
                                this.sipInfo,
                                nonce,
                                "INVITE"
                            );
                        const progressMessage = await this.send(
                            newMessage,
                            true
                        );

                        if (progressMessage) {
                            const outboundCallSession = new OutboundCallSession(
                                this,
                                progressMessage
                            );
                            this.currentCallSession = outboundCallSession;
                            this.isCallActive = true;
                            this.startRecording(outboundCallSession.callId);
                            this.startAudioProcessing();
                            return outboundCallSession;
                        } else {
                            throw new Error(
                                "[Softphone] No response received for authenticated INVITE"
                            );
                        }
                    } else {
                        throw new Error(
                            "[Softphone] Failed to extract nonce from Proxy-Authenticate header"
                        );
                    }
                } else if (inboundMessage.subject.startsWith("SIP/2.0 4")) {
                    throw new Error(
                        `[Softphone] Call rejected: ${inboundMessage.subject}`
                    );
                } else {
                    throw new Error(
                        `[Softphone] Unexpected response: ${inboundMessage.subject}`
                    );
                }
            } else {
                throw new Error(
                    "[Softphone] No response received for initial INVITE"
                );
            }
        } catch (error) {
            console.error(`[Softphone] Error during call setup:`, error);
            throw error;
        }
    }

    public async hangup(): Promise<void> {
        if (this.currentCallSession && this.isCallActive) {
            console.log("[Softphone] Sending BYE message to hang up call");
            await this.currentCallSession.hangup();
            this.cleanupCall();
        } else {
            console.log("[Softphone] No active call to hang up");
        }
    }

    private startRecording(callId: string) {
        const wavFilePath = path.join(
            this.audioLogFolder,
            `audio_log_${callId}.wav`
        );
        this.wavWriter = new wav.FileWriter(wavFilePath, {
            channels: 1,
            sampleRate: 8000,
            bitDepth: 16,
        });
        console.log(`[Softphone] Started recording audio to ${wavFilePath}`);
    }

    private finalizeRecording() {
        if (this.wavWriter) {
            this.wavWriter.end(() => {
                console.log(`[Softphone] Finished recording audio`);
                this.wavWriter = null;
            });
        } else {
            console.warn(`[Softphone] No active WAV writer to finalize`);
        }
    }

    public async sendAudio(audioData: ArrayBuffer) {
        if (this.currentCallSession && this.isCallActive) {
            console.log(
                `[Softphone] Sending audio data, size: ${audioData.byteLength} bytes`
            );
            const buffer = Buffer.from(audioData);
            await this.currentCallSession.sendAudio(buffer);
            if (this.wavWriter) {
                this.wavWriter.write(buffer);
            } else {
                console.warn(
                    "[Softphone] WAV writer not available for writing"
                );
            }
        } else {
            console.warn(
                "[Softphone] Attempted to send audio without an active call session"
            );
        }
    }

    public getAudioLog(callId: string): Buffer | null {
        const audioLogPath = path.join(
            this.audioLogFolder,
            `audio_log_${callId}.wav`
        );
        if (fs.existsSync(audioLogPath)) {
            console.log(
                `[Softphone] Retrieved audio log for CallID: ${callId}`
            );
            return fs.readFileSync(audioLogPath);
        }
        console.warn(`[Softphone] No audio log found for CallID: ${callId}`);
        return null;
    }

    public playAudioLog(callId: string): void {
        const audioData = this.getAudioLog(callId);
        if (audioData) {
            console.log(
                `[Softphone] Playing audio log for CallID: ${callId}, size: ${audioData.length} bytes`
            );
            for (const ws of this.activeWebSockets) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(audioData);
                }
            }
        } else {
            console.log(`[Softphone] No audio log found for CallID: ${callId}`);
        }
    }

    private handleRemoteHangup() {
        console.log("[Softphone] Remote hangup detected");
        this.cleanupCall();
    }

    private handleAudioPacket(packet: RtpPacket) {
        if (this.isCallActive) {
            console.log(
                `[Softphone] Handling audio packet - Payload size: ${packet.payload.length}`
            );

            const pcmData = this.muLawToPCM(packet.payload);

            if (this.wavWriter) {
                this.wavWriter.write(pcmData);
            }

            this.emit("audioData", pcmData);

            for (const ws of this.activeWebSockets) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(pcmData);
                }
            }
        } else {
            console.warn("[Softphone] Received audio packet for inactive call");
        }
    }

    private muLawToPCM(muLawData: Buffer): Buffer {
        const pcmData = Buffer.alloc(muLawData.length * 2);
        for (let i = 0; i < muLawData.length; i++) {
            const pcmSample = this.muLawToPCMSample(muLawData[i]);
            pcmData.writeInt16LE(pcmSample, i * 2);
        }
        return pcmData;
    }

    private muLawToPCMSample(muLaw: number): number {
        const MULAW_BIAS = 33;
        const MULAW_MAX = 0x1fff;
        let sign = 0;
        let exponent = 0;
        let mantissa = 0;
        let sample = 0;

        muLaw = ~muLaw;
        sign = muLaw & 0x80 ? -1 : 1;
        exponent = (muLaw >> 4) & 0x07;
        mantissa = muLaw & 0x0f;
        sample = mantissa << (exponent + 3);
        sample += MULAW_BIAS;
        sample *= sign;

        return sample;
    }

    private cleanupCall() {
        console.log("[Softphone] Cleaning up call resources");
        this.isCallActive = false;

        if (this.currentCallSession) {
            this.currentCallSession.dispose();
            this.currentCallSession = undefined;
        }

        this.finalizeRecording();
        this.lastInviteMessage = undefined;

        if (this.audioProcessingInterval) {
            clearInterval(this.audioProcessingInterval);
            this.audioProcessingInterval = null;
        }

        this.removeAllListeners("audioData");

        for (const ws of this.activeWebSockets) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "callEnded" }));
            }
        }

        this.emit("callEnded");
        console.log("[Softphone] Call ended, emitted callEnded event");
    }

    private startAudioProcessing() {
        if (this.audioProcessingInterval) {
            clearInterval(this.audioProcessingInterval);
        }

        this.audioProcessingInterval = setInterval(() => {
            if (!this.isCallActive) {
                clearInterval(this.audioProcessingInterval!);
                this.audioProcessingInterval = null;
                return;
            }

            if (this.currentCallSession) {
                this.currentCallSession.processAudio();
            }
        }, 20);
    }

    public onError(error: Error) {
        console.error(`[Softphone] Error occurred: ${error.message}`);
        this.emit("error", error);
        this.cleanupCall();
    }

    public setAudioHandler(handler: (packet: RtpPacket) => void) {
        this.on("audioPacket", handler);
    }
}

export default Softphone;
// 3.2

// number 0
// import EventEmitter from "events";
// import net from "net";
// import dgram from "dgram";
// import { RtpHeader, RtpPacket } from "werift-rtp";
// import { InboundMessage, RequestMessage, ResponseMessage } from "./sip-message";
// import { branch, generateAuthorization, randomInt, uuid } from "./utils";
// import InboundCallSession from "./call-session/inbound";
// import OutboundCallSession from "./call-session/outbound";
// import SipInfoResponse from "@rc-ex/core/lib/definitions/SipInfoResponse";
// import * as fs from "fs";
// import * as path from "path";
// import { spawn } from "child_process";

// class Softphone extends EventEmitter {
//     public sipInfo: SipInfoResponse;
//     public client: net.Socket;
//     public fakeDomain: string;
//     public fakeEmail: string;
//     public lastInviteMessage?: InboundMessage;
//     public currentCallSession?: InboundCallSession | OutboundCallSession;
//     public socket!: dgram.Socket;
//     private intervalHandle: NodeJS.Timeout | null = null;
//     private connected = false;
//     private isCallActive: boolean = false;
//     private audioLogStream: fs.WriteStream | null = null;
//     private audioLogFolder: string = path.join(
//         process.cwd(),
//         "src/data/llpmg/calls"
//     );
//     private audioLogPath: string | null = null;

//     constructor(sipInfo: SipInfoResponse) {
//         super();
//         this.sipInfo = sipInfo;
//         this.fakeDomain = uuid() + ".invalid";
//         this.fakeEmail = uuid() + "@" + this.fakeDomain;

//         if (!this.sipInfo.domain) {
//             this.sipInfo.domain = "sip.ringcentral.com";
//         }
//         if (!this.sipInfo.outboundProxy) {
//             this.sipInfo.outboundProxy = "sip112-1241.ringcentral.com:5091";
//         }

//         this.client = new net.Socket();
//         const tokens = this.sipInfo.outboundProxy.split(":");
//         this.client.connect(parseInt(tokens[1], 10), tokens[0], () => {
//             this.connected = true;
//             console.log("[Softphone] SIP client connected");
//         });

//         let cache = "";
//         this.client.on("data", (data) => {
//             cache += data.toString("utf-8");
//             if (!cache.endsWith("\r\n")) {
//                 return;
//             }

//             const tempMessages = cache
//                 .split("\r\nContent-Length: 0\r\n\r\n")
//                 .filter((message) => message.trim() !== "");
//             cache = "";
//             for (let i = 0; i < tempMessages.length; i++) {
//                 if (!tempMessages[i].includes("Content-Length: ")) {
//                     tempMessages[i] += "\r\nContent-Length: 0";
//                 }
//             }
//             for (const message of tempMessages) {
//                 const inboundMsg = InboundMessage.fromString(message);
//                 if (inboundMsg) {
//                     console.log(
//                         "[Softphone] Received SIP message:",
//                         inboundMsg.subject
//                     );
//                     this.emit("message", inboundMsg);
//                 }
//             }
//         });
//     }

//     public async register() {
//         if (!this.connected) {
//             await new Promise<void>((resolve) => {
//                 const checkConnection = setInterval(() => {
//                     if (this.connected) {
//                         clearInterval(checkConnection);
//                         resolve();
//                     }
//                 }, 100);
//             });
//         }
//         const sipRegister = async () => {
//             const requestMessage = new RequestMessage(
//                 `REGISTER sip:${this.sipInfo.domain} SIP/2.0`,
//                 {
//                     "Call-Id": uuid(),
//                     Contact: `<sip:${this.fakeEmail};transport=tcp>;expires=600`,
//                     From: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>;tag=${uuid()}`,
//                     To: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>`,
//                     Via: `SIP/2.0/TCP ${this.fakeDomain};branch=${branch()}`,
//                 }
//             );
//             const inboundMessage = await this.send(requestMessage, true);
//             if (
//                 inboundMessage &&
//                 inboundMessage.subject.startsWith("SIP/2.0 200 ")
//             ) {
//                 console.log("[Softphone] SIP registration successful");
//                 return;
//             }
//             const wwwAuth =
//                 inboundMessage?.headers["Www-Authenticate"] ||
//                 inboundMessage?.headers["WWW-Authenticate"];
//             if (wwwAuth) {
//                 const nonce = wwwAuth.match(/, nonce="(.+?)"/)?.[1];
//                 if (nonce) {
//                     const newMessage = requestMessage.fork();
//                     newMessage.headers.Authorization = generateAuthorization(
//                         this.sipInfo,
//                         nonce,
//                         "REGISTER"
//                     );
//                     await this.send(newMessage);
//                     console.log(
//                         "[Softphone] SIP registration with authentication successful"
//                     );
//                 }
//             }
//         };
//         await sipRegister();
//         this.intervalHandle = setInterval(sipRegister, 3 * 60 * 1000);
//         this.on("message", (inboundMessage: InboundMessage) => {
//             if (inboundMessage.subject.startsWith("INVITE sip:")) {
//                 console.log("[Softphone] Incoming call detected");
//                 this.lastInviteMessage = inboundMessage;
//                 this.emit("invite", inboundMessage);
//             } else if (inboundMessage.subject.startsWith("BYE")) {
//                 console.log("[Softphone] Received BYE message, ending call");
//                 this.handleRemoteHangup();
//             }
//         });
//     }

//     public send(
//         message: RequestMessage | ResponseMessage,
//         waitForReply = false
//     ): Promise<InboundMessage | undefined> {
//         console.log("[Softphone] Sending message:", message.toString());
//         this.client.write(message.toString());
//         if (!waitForReply) {
//             return Promise.resolve(undefined);
//         }
//         return new Promise<InboundMessage>((resolve, reject) => {
//             const messageListener = (inboundMessage: InboundMessage) => {
//                 if (inboundMessage.headers.CSeq !== message.headers.CSeq) {
//                     return;
//                 }
//                 if (inboundMessage.subject.startsWith("SIP/2.0 100 ")) {
//                     return;
//                 }
//                 this.off("message", messageListener);
//                 resolve(inboundMessage);
//             };
//             this.on("message", messageListener);
//             setTimeout(() => {
//                 this.off("message", messageListener);
//                 reject(new Error("[Softphone] No response received in time"));
//             }, 30000);
//         });
//     }

//     public async call(callee: string): Promise<OutboundCallSession> {
//         console.log(`[Softphone] Initiating outgoing call to ${callee}`);
//         const offerSDP = `
// v=0
// o=- ${randomInt()} 0 IN IP4 127.0.0.1
// s=rc-softphone-ts
// c=IN IP4 127.0.0.1
// t=0 0
// m=audio ${randomInt()} RTP/AVP 0 101
// a=rtpmap:0 PCMU/8000
// a=rtpmap:101 telephone-event/8000
// a=fmtp:101 0-15
// a=sendrecv
// `.trim();

//         const inviteMessage = new RequestMessage(
//             `INVITE sip:${callee}@${this.sipInfo.domain} SIP/2.0`,
//             {
//                 "Call-Id": uuid(),
//                 Contact: `<sip:${this.fakeEmail};transport=tcp>;expires=600`,
//                 From: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>;tag=${uuid()}`,
//                 To: `<sip:${callee}@${this.sipInfo.domain}>`,
//                 Via: `SIP/2.0/TCP ${this.fakeDomain};branch=${branch()}`,
//                 "Content-Type": "application/sdp",
//             },
//             offerSDP
//         );

//         try {
//             console.log(`[Softphone] Sending initial INVITE message`);
//             const inboundMessage = await this.send(inviteMessage, true);

//             if (inboundMessage) {
//                 const proxyAuthenticate =
//                     inboundMessage.headers["Proxy-Authenticate"] ||
//                     inboundMessage.headers["proxy-authenticate"];
//                 if (proxyAuthenticate) {
//                     const nonceMatch =
//                         proxyAuthenticate.match(/nonce="([^"]+)"/);
//                     const nonce = nonceMatch ? nonceMatch[1] : null;

//                     if (nonce) {
//                         const newMessage = inviteMessage.fork();
//                         newMessage.headers["Proxy-Authorization"] =
//                             generateAuthorization(
//                                 this.sipInfo,
//                                 nonce,
//                                 "INVITE"
//                             );
//                         const progressMessage = await this.send(
//                             newMessage,
//                             true
//                         );

//                         if (progressMessage) {
//                             const outboundCallSession = new OutboundCallSession(
//                                 this,
//                                 progressMessage
//                             );
//                             this.currentCallSession = outboundCallSession;
//                             this.isCallActive = true;
//                             this.startRecording(outboundCallSession.callId);
//                             console.log(
//                                 `[Softphone] Call started, CallID: ${outboundCallSession.callId}`
//                             );
//                             return outboundCallSession;
//                         } else {
//                             throw new Error(
//                                 "[Softphone] No response received for authenticated INVITE"
//                             );
//                         }
//                     } else {
//                         throw new Error(
//                             "[Softphone] Failed to extract nonce from Proxy-Authenticate header"
//                         );
//                     }
//                 } else if (inboundMessage.subject.startsWith("SIP/2.0 4")) {
//                     throw new Error(
//                         `[Softphone] Call rejected: ${inboundMessage.subject}`
//                     );
//                 } else {
//                     throw new Error(
//                         `[Softphone] Unexpected response: ${inboundMessage.subject}`
//                     );
//                 }
//             } else {
//                 throw new Error(
//                     "[Softphone] No response received for initial INVITE"
//                 );
//             }
//         } catch (error) {
//             console.error(`[Softphone] Error during call setup:`, error);
//             throw error;
//         }
//     }

//     public async hangup(): Promise<void> {
//         if (this.currentCallSession && this.isCallActive) {
//             console.log("[Softphone] Sending BYE message to hang up call");
//             await this.currentCallSession.hangup();
//             this.cleanupCall();
//         } else {
//             console.log("[Softphone] No active call to hang up");
//         }
//     }

//     public async answer(
//         inviteMessage: InboundMessage
//     ): Promise<InboundCallSession> {
//         console.log("[Softphone] Answering incoming call");
//         const inboundCallSession = new InboundCallSession(this, inviteMessage);
//         await inboundCallSession.answer();
//         this.currentCallSession = inboundCallSession;
//         this.isCallActive = true;
//         this.startRecording(inboundCallSession.callId);
//         return inboundCallSession;
//     }

//     private handleRemoteHangup() {
//         console.log("[Softphone] Remote hangup detected");
//         this.cleanupCall();
//     }

//     public onError(error: Error) {
//         console.error(`[Softphone] Error occurred: ${error.message}`);
//         this.emit("error", error);
//         this.cleanupCall();
//     }

//     public enableDebugMode() {
//         this.on("message", (message: InboundMessage) =>
//             console.log(
//                 `[Softphone] Receiving...(${new Date()})\n` + message.toString()
//             )
//         );
//         const tcpWrite = this.client.write.bind(this.client);
//         this.client.write = (message: string | Uint8Array) => {
//             console.log(`[Softphone] Sending...(${new Date()})\n` + message);
//             return tcpWrite(message);
//         };
//     }

//     public async sendAudio(audioData: ArrayBuffer) {
//         if (this.currentCallSession && this.isCallActive) {
//             console.log(
//                 `[Softphone] Sending audio data, size: ${audioData.byteLength} bytes`
//             );
//             const buffer = Buffer.from(audioData);
//             await this.currentCallSession.sendAudio(buffer);
//             this.logAudio(buffer);
//         } else {
//             console.warn(
//                 "[Softphone] Attempted to send audio without an active call session"
//             );
//         }
//     }

//     private startRecording(callId: string) {
//         this.audioLogPath = path.join(
//             this.audioLogFolder,
//             `audio_log_${callId}.raw`
//         );
//         console.log(
//             `[Softphone] Started recording audio to ${this.audioLogPath}`
//         );
//         // Create an empty file
//         fs.writeFileSync(this.audioLogPath, Buffer.alloc(0));
//     }

//     private stopRecording() {
//         if (this.audioLogPath) {
//             console.log(`[Softphone] Finished recording audio`);
//             this.convertAudioToWav(this.audioLogPath);
//             this.audioLogPath = null;
//         } else {
//             console.warn(`[Softphone] No active audio recording to stop`);
//         }
//     }

//     private logAudio(audioData: Buffer) {
//         if (this.audioLogPath) {
//             try {
//                 fs.appendFileSync(this.audioLogPath, audioData);
//                 console.log(
//                     `[Softphone] Logged ${audioData.length} bytes of audio data`
//                 );
//             } catch (error) {
//                 console.error(`[Softphone] Error logging audio: ${error}`);
//             }
//         } else {
//             console.warn(
//                 "[Softphone] Attempted to log audio without an active recording"
//             );
//         }
//     }

//     private convertAudioToWav(rawAudioPath: string) {
//         const wavAudioPath = rawAudioPath.replace(".raw", ".wav");

//         if (fs.existsSync(rawAudioPath)) {
//             console.log(`[Softphone] Converting audio log to .wav format`);
//             const ffmpeg = spawn("ffmpeg", [
//                 "-f",
//                 "s16le",
//                 "-ar",
//                 "8000",
//                 "-ac",
//                 "1",
//                 "-i",
//                 rawAudioPath,
//                 wavAudioPath,
//             ]);

//             ffmpeg.on("close", (code) => {
//                 if (code === 0) {
//                     console.log(
//                         `[Softphone] Audio log successfully converted to ${wavAudioPath}`
//                     );
//                     fs.unlinkSync(rawAudioPath);
//                 } else {
//                     console.error(
//                         `[Softphone] Failed to convert audio log to .wav format (Exit code: ${code})`
//                     );
//                 }
//             });

//             ffmpeg.stderr.on("data", (data) => {
//                 console.error(`[Softphone] FFmpeg error: ${data}`);
//             });
//         } else {
//             console.error(
//                 `[Softphone] No raw audio log found for conversion: ${rawAudioPath}`
//             );
//         }
//     }

//     private cleanupCall() {
//         console.log("[Softphone] Cleaning up call resources");
//         this.isCallActive = false;

//         if (this.currentCallSession) {
//             this.currentCallSession.dispose();
//             this.currentCallSession = undefined;
//         }

//         this.lastInviteMessage = undefined;

//         this.stopRecording();

//         this.removeAllListeners("audioData");

//         this.emit("callEnded");
//         console.log("[Softphone] Call ended, emitted callEnded event");
//     }
// }

// export default Softphone;
// number 0
