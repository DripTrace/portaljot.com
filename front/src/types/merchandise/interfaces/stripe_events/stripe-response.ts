import { StripeWebhookEvent } from '@/types/merchandise/types';
import { StripeEventRequest } from './stripe-request';

type RetrievedEvent = {};

export interface StripeEventResponse extends StripeEventRequest {
  api_version: string;
  data: {
    object: RetrievedEvent;
    previous_attributes?: {};
  };
  request: {
    id?: string;
    idempootency_key?: string;
  };
  type: string;
  object: StripeWebhookEvent;
  account?: string;
  created: Date;
  livemode: boolean;
  pending_webhooks: number;
}
