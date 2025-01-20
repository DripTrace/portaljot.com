export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    year: string;
    month: string;
    day: string;
    insurance: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    pharmacy: string;
    reason: string;
    customReason?: string;
    suggestedAppointment: Date | null;
    consentGiven: boolean;
}
