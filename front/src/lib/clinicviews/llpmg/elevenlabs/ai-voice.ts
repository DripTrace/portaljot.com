export class ElevenStreamingWeb {
    public readonly audioContext: AudioContext;

    constructor() {
        this.audioContext = new AudioContext();
    }

    async createAudioBuffer(base64Audio: string): Promise<AudioBuffer> {
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);
        return audioBuffer;
    }

    async playAudioBuffer(audioBuffer: AudioBuffer, session: any): Promise<void> {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;

        const streamDestination = this.audioContext.createMediaStreamDestination();
        source.connect(streamDestination);

        const senderTrack = session.sessionDescriptionHandler.peerConnection.getSenders()[0].track;
        if (senderTrack) {
            const newTrack = streamDestination.stream.getAudioTracks()[0];
            await senderTrack.replaceTrack(newTrack);
        }

        source.start();

        return new Promise<void>((resolve) => {
            source.onended = () => resolve();
        });
    }
}