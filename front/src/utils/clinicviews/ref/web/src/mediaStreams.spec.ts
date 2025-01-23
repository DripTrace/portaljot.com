import EventEmitter from "events";
import { faker } from "@faker-js/faker";

import {
	default as MediaStreams,
	MediaStreamsImpl,
	Browsers,
	WebPhoneRTPReport,
} from "./mediaStreams";
import type { WebPhoneSession } from "./session";

// #region Mocks

const mockNavigator = {
	userAgent: "",
};

Object.defineProperty(global, "navigator", {
	value: mockNavigator,
	writable: true,
});

class MockLogger {
	public log: (message: string) => void;
	public debug: (message: string) => void;
	public error: (message: string) => void;
	public info: (message: string) => void;
	public constructor() {
		this.log = () => null;
		this.debug = () => null;
		this.error = () => null;
		this.info = () => null;
	}
}

class MockSessionDescriptionHandler {
	public peerConnection: MockPeerConnection;
	public constructor() {
		this.peerConnection = new MockPeerConnection();
	}
}

class MockUserAgent {
	public logger: MockLogger;
	public defaultHeaders: Record<string, string>;
	public constructor() {
		this.logger = new MockLogger();
		this.defaultHeaders = {};
	}
}

class MockSession {
	public sessionDescriptionHandler: MockSessionDescriptionHandler;
	public userAgent: MockUserAgent;
	public logger: MockLogger;
	private eventEmitter = new EventEmitter();
	public constructor() {
		this.sessionDescriptionHandler = new MockSessionDescriptionHandler();
		this.userAgent = new MockUserAgent();
		this.logger = new MockLogger();
	}
	public emit(event: string, parameter: MockSession | null) {
		this.eventEmitter.emit(event, parameter);
	}
	public on(event: string, callback: (p: MockSession | null) => void) {
		this.eventEmitter.on(event, callback);
	}
	public reinvite() {}
}

class MockPeerConnection {
	public static iceConnectionStates = {
		new: "mediaConnectionStateNew",
		checking: "mediaConnectionStateChecking",
		connected: "mediaConnectionStateConnected",
		completed: "mediaConnectionStateCompleted",
		failed: "mediaConnectionStateFailed",
		disconnected: "mediaConnectionStateDisconnected",
		closed: "mediaConnectionStateClosed",
	};
	public static defaultStats = [
		{
			type: "inbound-rtp",
			bytesReceived: 100,
			packetsReceived: 200,
			jitter: 300,
			packetsLost: 400,
			fractionLost: 500,
			mediaType: "audio",
		},
		{
			type: "outbound-rtp",
			bytesSent: 100,
			packetsSent: 200,
			mediaType: "audio",
		},
		{
			type: "candidate-pair",
			currentRoundTripTime: 1.05,
		},
	];
	public connectionState = "new";
	private eventEmitter = new EventEmitter();
	public set iceConnectionState(state) {
		this.connectionState = state;
	}
	public get iceConnectionState() {
		return this.connectionState;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getStats(): Promise<any> {
		return new Promise((resolve) => {
			resolve(MockPeerConnection.defaultStats);
		});
	}
	public addEventListener(
		eventName: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		listener: (...args: any[]) => void
	) {
		this.eventEmitter.addListener(eventName, listener);
	}
	public removeEventListener(
		eventName: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		listener: (...args: any[]) => void
	) {
		this.eventEmitter.removeListener(eventName, listener);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public emit(eventName: string, ...data: any[]) {
		this.eventEmitter.emit(eventName, data);
	}
}

const mockRtpStats = {
	"inbound-rtp": {
		type: "inbound-rtp",
		bytesReceived: faker.number.int(),
		packetsReceived: faker.number.int(),
		jitter: faker.number.int(),
		packetsLost: faker.number.int(),
		fractionLost: faker.number.int(),
		mediaType: faker.word.sample(),
		roundTripTime: faker.number.int(),
	},
	"outbound-rtp": {
		type: "outbound-rtp",
		bytesSent: faker.number.int(),
		packetsSent: faker.number.int(),
		mediaType: faker.word.sample(),
	},
	"candidate-pair": {
		type: "candidate-pair",
		currentRoundTripTime: faker.number.int(),
	},
	"local-candidate": {
		type: "local-candidate",
		id: faker.number.int(),
		isRemote: faker.datatype.boolean(),
		ip: faker.internet.ip(),
		candidateType: faker.word.sample(),
		networkType: faker.word.sample(),
		priority: faker.number.int(),
		port: faker.internet.port(),
	},
	"remote-candidate": {
		type: "remote-candidate",
		id: faker.number.int(),
		isRemote: faker.datatype.boolean(),
		ip: faker.internet.ip(),
		candidateType: faker.word.sample(),
		priority: faker.number.int(),
		port: faker.internet.port(),
	},
	"media-source": {
		type: "media-source",
		audioLevel: faker.number.int({ min: 0, max: 100 }),
	},
	track: {
		type: "track",
		audioLevel: faker.number.int({ min: 0, max: 100 }),
	},
	transport: {
		type: "transport",
		dtlsState: faker.word.sample(),
		packetsSent: faker.number.int(),
		packetsReceived: faker.number.int(),
		selectedCandidatePairChanges: faker.datatype.boolean(),
		selectedCandidatePairId: faker.number.int(),
	},
};

// #endregion

function generateMockStatAndReport() {
	const inboundRTP = mockRtpStats["inbound-rtp"];
	const outboundRTP = mockRtpStats["outbound-rtp"];
	const candidatePair = mockRtpStats["candidate-pair"];
	const localCandidate = mockRtpStats["local-candidate"];
	const remoteCandidate = mockRtpStats["remote-candidate"];
	const mediaSource = mockRtpStats["media-source"];
	const track = mockRtpStats["track"];
	const transport = mockRtpStats["transport"];
	const mockStat = [
		inboundRTP,
		outboundRTP,
		candidatePair,
		localCandidate,
		remoteCandidate,
		mediaSource,
		track,
		transport,
	];
	const mockReport = new WebPhoneRTPReport();
	mockReport.outboundRtpReport = {
		bytesSent: outboundRTP.bytesSent,
		packetsSent: outboundRTP.packetsSent,
		mediaType: outboundRTP.mediaType,
		rtpLocalAudioLevel: mediaSource.audioLevel,
	};
	mockReport.inboundRtpReport = {
		bytesReceived: inboundRTP.bytesReceived,
		packetsReceived: inboundRTP.packetsReceived,
		jitter: inboundRTP.jitter,
		packetsLost: inboundRTP.packetsLost,
		fractionLost: inboundRTP.fractionLost,
		mediaType: inboundRTP.mediaType,
	};
	mockReport.rttMs = {
		roundTripTime: inboundRTP.roundTripTime,
		currentRoundTripTime: candidatePair.currentRoundTripTime * 1000,
	};
	mockReport.localCandidates = [
		{
			id: localCandidate.id,
			isRemote: localCandidate.isRemote,
			ip: localCandidate.ip,
			candidateType: localCandidate.candidateType,
			networkType: localCandidate.networkType,
			priority: localCandidate.priority,
			port: localCandidate.port,
		},
	];
	mockReport.remoteCandidates = [
		{
			id: remoteCandidate.id,
			isRemote: remoteCandidate.isRemote,
			ip: remoteCandidate.ip,
			candidateType: remoteCandidate.candidateType,
			priority: remoteCandidate.priority,
			port: remoteCandidate.port,
		},
	];
	mockReport.transport = {
		dtlsState: transport.dtlsState,
		packetsSent: transport.packetsSent,
		packetsReceived: transport.packetsReceived,
		selectedCandidatePairChanges: transport.selectedCandidatePairChanges,
		selectedCandidatePairId: transport.selectedCandidatePairId,
	};
	return { mockStat, mockReport };
}

// Tests and other Jest-specific code should be moved to a separate file that is run in a Jest environment.

// Keep the test file separate from this implementation file to avoid errors outside the Jest test environment.
