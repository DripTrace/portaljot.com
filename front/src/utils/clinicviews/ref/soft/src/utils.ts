import type SipInfoResponse from "@rc-ex/core/lib/definitions/SipInfoResponse";
import crypto from "crypto";

const md5 = (s: string): string =>
	crypto.createHash("md5").update(s).digest("hex");

const generateResponse = (
	sipInfo: SipInfoResponse,
	endpoint: string,
	nonce: string
): string => {
	const ha1 = md5(
		`${sipInfo.authorizationId || ""}:${sipInfo.domain || ""}:${sipInfo.password || ""}`
	);
	const ha2 = md5(endpoint);
	const response = md5(`${ha1}:${nonce}:${ha2}`);
	return response;
};

export const branch = (): string => "z9hG4bK-" + uuid();

export const randomInt = (): number =>
	Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;

export const withoutTag = (s: string): string => s.replace(/;tag=.*$/, "");
export const extractAddress = (s: string): string => {
	if (!s) return "";
	const match = s.match(/<(sip:.+?)>/);
	return match ? match[1] : "";
};

export function uuid(): string {
	return crypto.randomBytes(16).toString("hex");
}

export function generateAuthorization(
	sipInfo: SipInfoResponse,
	nonce: string,
	method: string
): string {
	const { username, password, authorizationId, domain } = sipInfo;
	const realm = domain;
	const uri = `sip:${domain}`;
	const ha1 = crypto
		.createHash("md5")
		.update(`${authorizationId}:${realm}:${password}`)
		.digest("hex");
	const ha2 = crypto
		.createHash("md5")
		.update(`${method}:${uri}`)
		.digest("hex");
	const response = crypto
		.createHash("md5")
		.update(`${ha1}:${nonce}:${ha2}`)
		.digest("hex");

	return `Digest username="${authorizationId}", realm="${realm}", nonce="${nonce}", uri="${uri}", response="${response}", algorithm=MD5`;
}
