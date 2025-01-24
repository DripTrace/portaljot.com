import { NextRequest } from "next/server";

type StripeEventId = string;

export interface StripeEventRequest extends NextRequest {
	id: StripeEventId;
}
