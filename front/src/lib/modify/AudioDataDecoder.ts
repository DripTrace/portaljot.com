import type { AudioTrackInfo, TrakBox } from "mp4box";
import { VideoHelpers } from "./VideoHelpers";

function getAudioSpecificConfig(trak: TrakBox): Uint8Array | undefined {
	const descriptor = trak.mdia.minf.stbl.stsd.entries.find(
		VideoHelpers.isMp4aEntry
	)?.esds.esd.descs[0];
	if (!descriptor) {
		return undefined;
	}
	return descriptor.descs[0].data;
}

interface AudioDataDecoderProps {
	onDecode(audioData: AudioData): void;
}

export class AudioDataDecoder {
	private decoder: AudioDecoder;
	private lastConfig: AudioDecoderConfig | null = null;

	static buildConfig(
		info: AudioTrackInfo,
		trak: TrakBox
	): AudioDecoderConfig {
		return {
			codec: info.codec,
			numberOfChannels: info.audio.channel_count,
			sampleRate: info.audio.sample_rate,
			description: getAudioSpecificConfig(trak),
		};
	}

	constructor({ onDecode }: AudioDataDecoderProps) {
		this.decoder = new AudioDecoder({
			error: console.log,
			output: onDecode,
		});
	}

	decode = (
		audioChunk: EncodedAudioChunk,
		codecConfig: AudioDecoderConfig
	) => {
		if (
			this.decoder.state === "unconfigured" ||
			this.lastConfig !== codecConfig
		) {
			this.decoder.configure(codecConfig);
			this.lastConfig = codecConfig;
		}

		this.decoder.decode(audioChunk);
	};

	flush = () => {
		this.decoder.flush();
	};

	reset = () => {
		this.decoder.reset();
	};
}
