interface ErrorResponse {
    error: {
        code: string;
        message: string;
        innerError?: {
            date: string;
            request_id: string;
            client_request_id: string;
        };
    };
}

interface AppointmentResponse {
    id: string;
    subject: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    attendees: [
        {
            emailAddress: {
                address: string;
                name: string;
            };
            type: string;
        }
    ];
}
