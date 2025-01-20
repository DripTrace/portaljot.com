import { RtpHeader, RtpPacket } from "werift-rtp";
import type CallSession from ".";
import { randomInt } from "../utils";

class Streamer {
    public paused = false;
    private callSession: CallSession;
    private buffer: Buffer;
    private originalBuffer: Buffer;
    private sequenceNumber = randomInt();
    private timestamp = randomInt();
    private ssrc = randomInt();

    public constructor(callSession: CallSession, buffer: Buffer) {
        this.callSession = callSession;
        this.buffer = buffer;
        this.originalBuffer = buffer;
        console.log(
            "Streamer initialized with sequenceNumber:",
            this.sequenceNumber,
            "timestamp:",
            this.timestamp,
            "ssrc:",
            this.ssrc
        );
    }

    public async start() {
        console.log("Streamer started");
        this.buffer = this.originalBuffer;
        this.paused = false;
        this.sendPacket();
    }

    public async stop() {
        console.log("Streamer stopped");
        this.buffer = Buffer.alloc(0);
    }

    public async pause() {
        console.log("Streamer paused");
        this.paused = true;
    }

    public async resume() {
        console.log("Streamer resumed");
        this.paused = false;
        this.sendPacket();
    }

    public get finished() {
        const isFinished = this.buffer.length < 160;
        console.log("Streamer finished:", isFinished);
        return isFinished;
    }

    private sendPacket() {
        if (!this.callSession.disposed && !this.paused && !this.finished) {
            console.log("Sending RTP packet");
            const temp = this.buffer.subarray(0, 160);
            this.buffer = this.buffer.subarray(160);

            const rtpPacket = new RtpPacket(
                new RtpHeader({
                    version: 2,
                    padding: false,
                    paddingSize: 0,
                    extension: false,
                    marker: false,
                    payloadOffset: 12,
                    payloadType: 0,
                    sequenceNumber: this.sequenceNumber,
                    timestamp: this.timestamp,
                    ssrc: this.ssrc,
                    csrcLength: 0,
                    csrc: [],
                    extensionProfile: 48862,
                    extensionLength: undefined,
                    extensions: [],
                }),
                temp
            );

            console.log("RTP Packet Details:", {
                sequenceNumber: this.sequenceNumber,
                timestamp: this.timestamp,
                ssrc: this.ssrc,
                payloadLength: temp.length,
            });

            this.callSession.send(rtpPacket.serialize());

            this.sequenceNumber += 1;
            if (this.sequenceNumber > 65535) {
                this.sequenceNumber = 0;
            }
            this.timestamp += 160;

            setTimeout(() => this.sendPacket(), 20);
        } else {
            console.log(
                "Packet not sent. Disposed:",
                this.callSession.disposed,
                "Paused:",
                this.paused,
                "Finished:",
                this.finished
            );
        }
    }
}

export default Streamer;
