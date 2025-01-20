import type { DocumentSnapshot } from 'firebase/firestore';
import type { Account} from 'next-auth';

export interface AccountSetup {
  mcc?: string;
  url?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  line1?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  email?: string;
  phone?: string;
  ssnLast4?: string;
}

export interface ExternalSetup extends AccountSetup {
  currency?: string;
  bankName?: string;
  routing_number?: string;
  account_number?: string;
  cardName?: string;
  number?: string;
  exp_month_year?: string;
  cvc?: string;
}

export interface ObinsunId extends Account {
  firebaseId?: DocumentSnapshot['id'];
}

export interface InitialAccount {
  transactId: ObinsunId['firebaseId'];
  change: string;
  formData?: ExternalSetup;
  date?: number;
  ip?: string;
  cc?: string;
  country?: string;
  stripeId?: string;
  object?: string;
}

export interface UserCreation {
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  role: string;
}

export interface keyCreation {
  obinsunKey: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ip: string;
  cc: string;
}