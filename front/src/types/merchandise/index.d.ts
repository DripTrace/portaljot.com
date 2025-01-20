declare module "react-svgmt"

import { DefaultSession } from 'next-auth';
import { ExternalAccountCreateParams } from 'stripe';
import JSX from './jsx';

declare module 'next-auth' {
  interface Session {
    user?: {
      role?: string;
      stripeId?: string;
      customerId?: string;
      // accountId?: string;
      // personId?: string;
      username?: string;
      firstname?: string;
      lastname?: string;
      obinsunId?: string;
      firestoreId?: string;
      registeredInfo?: {
        userCountryCode: string;
        userCurrency: string;
        userFlag: string;
      };
      shipping?: {
        address?: {
          line1?: string;
          line2?: string;
          city?: string;
          postal_code?: string;
          state?: string;
        };
        name?: string;
        phone?: string;
      };
      neccessary_actions?: Object<T>;
      personal_info?: Object<T>;
      verification?: Object<T>;
      company_verification?: Object<T>;
      individual_verification?: Object<T>;
      stripe_metadata?: Object<T>;
      stripeBalance?: Object<T>;
      external_accounts?: Object<T>;
      permissions?: { admin: [Object] };
    } & DefaultSession['user'];
    expires?: DefaultSession['expires'];
    id?: string;
  }
}