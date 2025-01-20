// 3.1 (audi logs don't end after hangup)
import EventEmitter from "events";
import dgram from "dgram";
import { RtpHeader, RtpPacket } from "werift-rtp";
import WebSocket from "ws";
import type Softphone from "../softphone";
import {
    InboundMessage,
    RequestMessage,
    ResponseMessage,
} from "../sip-message";
import { branch, extractAddress } from "../utils";

abstract class CallSession extends EventEmitter {
    private webSocket: WebSocket | null = null;
    public softphone: Softphone;
    public sipMessage: InboundMessage;
    public socket!: dgram.Socket;
    public localPeer!: string;
    public remotePeer!: string;
    public remoteIP: string;
    public remotePort: number;
    public disposed = false;
    public startTime: number;
    public bytesReceived: number = 0;
    public bytesSent: number = 0;
    public packetsReceived: number = 0;
    public packetsSent: number = 0;

    private sequenceNumber: number = 0;
    private timestamp: number = 0;
    private ssrc: number;

    constructor(softphone: Softphone, sipMessage: InboundMessage) {
        super();
        this.softphone = softphone;
        this.sipMessage = sipMessage;
        this.remoteIP = this.sipMessage.body.match(/c=IN IP4 ([\d.]+)/)![1];
        this.remotePort = parseInt(
            this.sipMessage.body.match(/m=audio (\d+) /)![1],
            10
        );
        this.startTime = Date.now();
        this.ssrc = Math.floor(Math.random() * 0xffffffff);
    }

    public setWebSocket(ws: WebSocket) {
        this.webSocket = ws;
        console.log("[CallSession] WebSocket connection established");
    }

    public get callId() {
        return this.sipMessage.headers["Call-Id"];
    }

    public send(data: Buffer) {
        this.socket.send(data, this.remotePort, this.remoteIP);
        this.packetsSent++;
        this.bytesSent += data.length;
    }

    public async transfer(target: string) {
        const requestMessage = new RequestMessage(
            `REFER sip:${extractAddress(this.remotePeer)} SIP/2.0`,
            {
                "Call-Id": this.callId,
                From: this.localPeer,
                To: this.remotePeer,
                Via: `SIP/2.0/TCP ${this.softphone.fakeDomain};branch=${branch()}`,
                "Refer-To": `sip:${target}@sip.ringcentral.com`,
                "Referred-By": `<${extractAddress(this.localPeer)}>`,
            }
        );
        this.softphone.send(requestMessage);
        const notifyHandler = (inboundMessage: InboundMessage) => {
            if (!inboundMessage.subject.startsWith("NOTIFY ")) {
                return;
            }
            const responseMessage = new ResponseMessage(inboundMessage, 200);
            this.softphone.send(responseMessage);
            if (inboundMessage.body.trim() === "SIP/2.0 200 OK") {
                this.softphone.off("message", notifyHandler);
            }
        };
        this.softphone.on("message", notifyHandler);
    }

    public async hangup() {
        const requestMessage = new RequestMessage(
            `BYE sip:${this.softphone.sipInfo.domain} SIP/2.0`,
            {
                "Call-Id": this.callId,
                From: this.localPeer,
                To: this.remotePeer,
                Via: `SIP/2.0/TCP ${this.softphone.fakeDomain};branch=${branch()}`,
            }
        );
        this.softphone.send(requestMessage);
    }

    public async sendAudio(audioData: Buffer) {
        console.log(
            `[CallSession] Sending audio data, size: ${audioData.length} bytes`
        );
        const rtpPacket = this.createRtpPacketFromAudio(audioData);
        this.send(rtpPacket.serialize());
    }

    private createRtpPacketFromAudio(audioData: Buffer): RtpPacket {
        const rtpHeader = new RtpHeader({
            version: 2,
            padding: false,
            extension: false,
            marker: false,
            payloadType: 0, // PCMU
            sequenceNumber: this.sequenceNumber++,
            timestamp: this.timestamp,
            ssrc: this.ssrc,
        });

        this.timestamp += audioData.length;

        return new RtpPacket(rtpHeader, audioData);
    }

    protected async startLocalServices() {
        this.socket = dgram.createSocket("udp4");
        this.socket.on("message", (message) => {
            const rtpPacket = RtpPacket.deSerialize(message);
            this.packetsReceived++;
            this.bytesReceived += message.length;

            console.log(
                `[CallSession] Received RTP packet - Size: ${message.length}, PayloadType: ${rtpPacket.header.payloadType}`
            );

            if (rtpPacket.header.payloadType === 0) {
                // PCMU
                this.emit("audioPacket", rtpPacket);
                this.handleAudioPacket(rtpPacket);
            }
        });
        this.socket.bind();

        const byeHandler = (inboundMessage: InboundMessage) => {
            if (inboundMessage.headers["Call-Id"] !== this.callId) {
                return;
            }
            if (inboundMessage.headers.CSeq.endsWith(" BYE")) {
                this.softphone.off("message", byeHandler);
                this.dispose();
            }
        };
        this.softphone.on("message", byeHandler);
    }

    private handleAudioPacket(packet: RtpPacket) {
        console.log(
            `[CallSession] Handling audio packet - Payload size: ${packet.payload.length}`
        );
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(packet.payload);
        }
        this.emit("audioData", packet.payload);
    }

    public processAudio() {
        // This method is called periodically by the Softphone class
        // It can be used to handle any periodic audio processing tasks
        // For now, it's empty as the audio processing is done in real-time in handleAudioPacket
    }

    public dispose() {
        this.disposed = true;
        this.emit("disposed");
        this.removeAllListeners();
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket.close();
        }
        if (this.webSocket) {
            this.webSocket.close();
        }
    }
}

export default CallSession;
// 3.1

// number 0
// import EventEmitter from "events";
// import dgram from "dgram";
// import { RtpHeader, RtpPacket } from "werift-rtp";
// import WebSocket from "ws";
// import type Softphone from "../softphone";
// import {
//     InboundMessage,
//     RequestMessage,
//     ResponseMessage,
// } from "../sip-message";
// import { branch, extractAddress } from "../utils";

// abstract class CallSession extends EventEmitter {
//     private webSocket: WebSocket | null = null;
//     public softphone: Softphone;
//     public sipMessage: InboundMessage;
//     public socket!: dgram.Socket;
//     public localPeer!: string;
//     public remotePeer!: string;
//     public remoteIP: string;
//     public remotePort: number;
//     public disposed = false;
//     public startTime: number;
//     public bytesReceived: number = 0;
//     public bytesSent: number = 0;
//     public packetsReceived: number = 0;
//     public packetsSent: number = 0;

//     private sequenceNumber: number = 0;
//     private timestamp: number = 0;
//     private ssrc: number;

//     constructor(softphone: Softphone, sipMessage: InboundMessage) {
//         super();
//         this.softphone = softphone;
//         this.sipMessage = sipMessage;
//         this.remoteIP = this.sipMessage.body.match(/c=IN IP4 ([\d.]+)/)![1];
//         this.remotePort = parseInt(
//             this.sipMessage.body.match(/m=audio (\d+) /)![1],
//             10
//         );
//         this.startTime = Date.now();
//         this.ssrc = Math.floor(Math.random() * 0xffffffff);
//     }

//     public setWebSocket(ws: WebSocket) {
//         this.webSocket = ws;
//         console.log("[CallSession] WebSocket connection established");
//     }

//     public get callId() {
//         return this.sipMessage.headers["Call-Id"];
//     }

//     public send(data: Buffer) {
//         this.socket.send(data, this.remotePort, this.remoteIP);
//         this.packetsSent++;
//         this.bytesSent += data.length;
//     }

//     public async transfer(target: string) {
//         const requestMessage = new RequestMessage(
//             `REFER sip:${extractAddress(this.remotePeer)} SIP/2.0`,
//             {
//                 "Call-Id": this.callId,
//                 From: this.localPeer,
//                 To: this.remotePeer,
//                 Via: `SIP/2.0/TCP ${this.softphone.fakeDomain};branch=${branch()}`,
//                 "Refer-To": `sip:${target}@sip.ringcentral.com`,
//                 "Referred-By": `<${extractAddress(this.localPeer)}>`,
//             }
//         );
//         this.softphone.send(requestMessage);
//         const notifyHandler = (inboundMessage: InboundMessage) => {
//             if (!inboundMessage.subject.startsWith("NOTIFY ")) {
//                 return;
//             }
//             const responseMessage = new ResponseMessage(inboundMessage, 200);
//             this.softphone.send(responseMessage);
//             if (inboundMessage.body.trim() === "SIP/2.0 200 OK") {
//                 this.softphone.off("message", notifyHandler);
//             }
//         };
//         this.softphone.on("message", notifyHandler);
//     }

//     public async hangup() {
//         const requestMessage = new RequestMessage(
//             `BYE sip:${this.softphone.sipInfo.domain} SIP/2.0`,
//             {
//                 "Call-Id": this.callId,
//                 From: this.localPeer,
//                 To: this.remotePeer,
//                 Via: `SIP/2.0/TCP ${this.softphone.fakeDomain};branch=${branch()}`,
//             }
//         );
//         this.softphone.send(requestMessage);
//     }

//     public async sendAudio(audioData: Buffer) {
//         console.log(
//             `[CallSession] Sending audio data, size: ${audioData.length} bytes`
//         );
//         const rtpPacket = this.createRtpPacketFromAudio(audioData);
//         this.send(rtpPacket.serialize());
//     }

//     private createRtpPacketFromAudio(audioData: Buffer): RtpPacket {
//         const rtpHeader = new RtpHeader({
//             version: 2,
//             padding: false,
//             extension: false,
//             marker: false,
//             payloadType: 0, // PCMU
//             sequenceNumber: this.sequenceNumber++,
//             timestamp: this.timestamp,
//             ssrc: this.ssrc,
//         });

//         this.timestamp += audioData.length;

//         return new RtpPacket(rtpHeader, audioData);
//     }

//     protected async startLocalServices() {
//         this.socket = dgram.createSocket("udp4");
//         this.socket.on("message", (message) => {
//             const rtpPacket = RtpPacket.deSerialize(message);
//             this.packetsReceived++;
//             this.bytesReceived += message.length;

//             console.log(
//                 `[CallSession] Received RTP packet - Size: ${message.length}, PayloadType: ${rtpPacket.header.payloadType}`
//             );

//             if (rtpPacket.header.payloadType === 0) {
//                 // PCMU
//                 this.emit("audioPacket", rtpPacket);
//                 this.handleAudioPacket(rtpPacket);
//             }
//         });
//         this.socket.bind();

//         const byeHandler = (inboundMessage: InboundMessage) => {
//             if (inboundMessage.headers["Call-Id"] !== this.callId) {
//                 return;
//             }
//             if (inboundMessage.headers.CSeq.endsWith(" BYE")) {
//                 this.softphone.off("message", byeHandler);
//                 this.dispose();
//             }
//         };
//         this.softphone.on("message", byeHandler);
//     }

//     private handleAudioPacket(packet: RtpPacket) {
//         console.log(
//             `[CallSession] Handling audio packet - Payload size: ${packet.payload.length}`
//         );
//         if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
//             this.webSocket.send(packet.payload);
//         }
//         this.softphone.emit("audioData", packet.payload);
//     }

//     public dispose() {
//         this.disposed = true;
//         this.emit("disposed");
//         this.removeAllListeners();
//         if (this.socket) {
//             this.socket.removeAllListeners();
//             this.socket.close();
//         }
//         if (this.webSocket) {
//             this.webSocket.close();
//         }
//     }
// }

// export default CallSession;
// number 0
