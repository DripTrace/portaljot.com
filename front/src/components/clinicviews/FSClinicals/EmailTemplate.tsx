// import React from "react";

// interface EmailTemplateProps {
//     name: string;
//     email: string;
//     phone: string;
//     gad7_score: string;
//     phq9_score: string;
//     asrs_score: string;
//     dast_score: string;
//     reason: string;
//     appointmentDate?: string;
//     appointmentTime?: string;
//     isDoctor: boolean;
//     isNewPatient: boolean;
// }

// const EmailTemplate: React.FC<EmailTemplateProps> = ({
//     name,
//     email,
//     phone,
//     gad7_score,
//     phq9_score,
//     asrs_score,
//     dast_score,
//     reason,
//     appointmentDate,
//     appointmentTime,
//     isDoctor,
//     isNewPatient,
// }) => {
//     const containerStyle = {
//         fontFamily: "Arial, sans-serif",
//         color: "#333",
//         textAlign: "center",
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//         maxWidth: "600px",
//         margin: "auto",
//     } as React.CSSProperties;

//     const headerStyle = {
//         backgroundColor: isDoctor ? "#0073e6" : "#f8f8f8",
//         color: isDoctor ? "#fff" : "#333",
//         padding: "10px 0",
//         borderBottom: isDoctor ? "none" : "1px solid #ddd",
//         borderRadius: "8px 8px 0 0",
//     } as React.CSSProperties;

//     const contentStyle = {
//         padding: "20px",
//     } as React.CSSProperties;

//     const footerStyle = {
//         marginTop: "20px",
//         fontSize: "12px",
//         color: "#888",
//     } as React.CSSProperties;

//     const getHeaderText = () => {
//         if (isDoctor) {
//             return isNewPatient
//                 ? "New Patient Registration and Appointment"
//                 : "New Appointment Suggestion";
//         } else {
//             return isNewPatient
//                 ? "Registration Confirmation"
//                 : "Appointment Suggestion Confirmation";
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             <div style={headerStyle}>
//                 <h1>{getHeaderText()}</h1>
//             </div>
//             <div style={contentStyle}>
//                 <p>
//                     {isDoctor
//                         ? `${name} just ${
//                               isNewPatient
//                                   ? "sent a registration"
//                                   : "suggested an appointment"
//                           }. Here are the details we've received:`
//                         : `Thank you for ${
//                               isNewPatient ? "registering with" : "contacting"
//                           } Four Square Clinicals. Here are the details we've received:`}
//                 </p>
//                 <p>
//                     <strong>Name:</strong> {name}
//                 </p>
//                 <p>
//                     <strong>Email:</strong> {email}
//                 </p>
//                 <p>
//                     <strong>Phone:</strong> {phone}
//                 </p>
//                 {isNewPatient && (
//                     <span>
//                         <p>
//                             <strong>Reason for Visit:</strong> {reason}
//                         </p>
//                     </span>
//                 )}
//                 <span className="flex flex-col items-center justify-center">
//                     <strong>GAD-7 Score:</strong> {gad7_score}{" "}
//                     <strong>PHQ-9 Score:</strong> {phq9_score}{" "}
//                     <strong>ASRS Score:</strong> {asrs_score}{" "}
//                     <strong>DAST Score:</strong> {dast_score}{" "}
//                 </span>
//                 {appointmentDate && appointmentTime && (
//                     <>
//                         <h2>
//                             {isDoctor ? `${name}'s ` : "Your "} Suggested
//                             Appointment
//                         </h2>
//                         <p>
//                             The suggested appointment time is {appointmentDate}{" "}
//                             at {appointmentTime}.
//                         </p>
//                     </>
//                 )}
//                 <p>
//                     {isDoctor
//                         ? `${name} will be expecting a call from you soon to ${
//                               isNewPatient
//                                   ? "confirm the registration"
//                                   : "discuss the appointment suggestion"
//                           } and provide further information.`
//                         : `We will contact you soon to ${
//                               isNewPatient
//                                   ? "confirm your registration"
//                                   : "discuss your appointment suggestion"
//                           } and provide further information.`}
//                 </p>
//                 {isDoctor && isNewPatient && (
//                     <p>
//                         Please review the attached PDF for additional
//                         information.
//                     </p>
//                 )}
//                 <p style={footerStyle}>
//                     If you have any questions, please contact us at{" "}
//                     <a href="mailto:info@fsclinicals.com">
//                         info@fsclinicals.com
//                     </a>{" "}
//                     or <a href="tel:(775) 238-3082">(775) 238-3082</a>.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default EmailTemplate;

import React from "react";

interface EmailTemplateProps {
    name: string;
    email: string;
    phone: string;
    gad7_score?: string;
    phq9_score?: string;
    asrs_score?: string;
    dast_score?: string;
    reason: string;
    appointmentDate?: string;
    appointmentTime?: string;
    isDoctor: boolean;
    isNewPatient?: boolean;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
    name,
    email,
    phone,
    gad7_score,
    phq9_score,
    asrs_score,
    dast_score,
    reason,
    appointmentDate,
    appointmentTime,
    isDoctor,
    isNewPatient,
}) => {
    const containerStyle = {
        fontFamily: "Arial, sans-serif",
        color: "#333",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "auto",
    } as React.CSSProperties;

    const headerStyle = {
        backgroundColor: isDoctor ? "#0073e6" : "#f8f8f8",
        color: isDoctor ? "#fff" : "#333",
        padding: "10px 0",
        borderBottom: isDoctor ? "none" : "1px solid #ddd",
        borderRadius: "8px 8px 0 0",
    } as React.CSSProperties;

    const contentStyle = {
        padding: "20px",
    } as React.CSSProperties;

    const footerStyle = {
        marginTop: "20px",
        fontSize: "12px",
        color: "#888",
    } as React.CSSProperties;

    const getHeaderText = () => {
        if (isDoctor) {
            return isNewPatient
                ? "New Patient Registration and Appointment"
                : "New Appointment Suggestion";
        } else {
            return isNewPatient
                ? "Registration Confirmation"
                : "Appointment Suggestion Confirmation";
        }
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1>{getHeaderText()}</h1>
            </div>
            <div style={contentStyle}>
                <p>
                    {isDoctor
                        ? `${name} has ${
                              isNewPatient
                                  ? "registered as a new patient"
                                  : "suggested an appointment"
                          }. Here are the details we've received:`
                        : `Thank you for ${
                              isNewPatient ? "registering with" : "contacting"
                          } Four Square Clinicals. Here are the details we've received:`}
                </p>
                <p>
                    <strong>Name:</strong> {name}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Phone:</strong> {phone}
                </p>
                <p>
                    <strong>Reason for Visit:</strong> {reason}
                </p>
                {isNewPatient && (
                    <div>
                        <h2>Assessment Scores</h2>
                        {gad7_score && (
                            <p>
                                <strong>GAD-7 Score:</strong> {gad7_score}
                            </p>
                        )}
                        {phq9_score && (
                            <p>
                                <strong>PHQ-9 Score:</strong> {phq9_score}
                            </p>
                        )}
                        {asrs_score && (
                            <p>
                                <strong>ASRS Score:</strong> {asrs_score}
                            </p>
                        )}
                        {dast_score && (
                            <p>
                                <strong>DAST Score:</strong> {dast_score}
                            </p>
                        )}
                    </div>
                )}
                {appointmentDate && appointmentTime && (
                    <>
                        <h2>
                            {isDoctor ? `${name}'s ` : "Your "}
                            {isNewPatient ? "Requested" : "Suggested"}{" "}
                            Appointment
                        </h2>
                        <p>
                            The {isNewPatient ? "requested" : "suggested"}{" "}
                            appointment time is {appointmentDate} at{" "}
                            {appointmentTime}.
                        </p>
                    </>
                )}
                <p>
                    {isDoctor
                        ? `Please review the details and ${
                              isNewPatient
                                  ? "contact the patient to confirm their registration and appointment"
                                  : "consider the appointment suggestion"
                          }.`
                        : `We will contact you soon to ${
                              isNewPatient
                                  ? "confirm your registration and appointment"
                                  : "discuss your appointment suggestion"
                          } and provide further information.`}
                </p>
                {isDoctor && isNewPatient && (
                    <p>
                        Please review the attached PDF for additional
                        information provided by the patient.
                    </p>
                )}
                <p style={footerStyle}>
                    If you have any questions, please contact us at{" "}
                    <a href="mailto:info@fsclinicals.com">
                        info@fsclinicals.com
                    </a>{" "}
                    or <a href="tel:(775) 238-3082">(775) 238-3082</a>.
                </p>
            </div>
        </div>
    );
};

export default EmailTemplate;

//     const getHeaderText = () => {
//         if (isDoctor) {
//             return isNewPatient
//                 ? "New Patient Registration and Appointment"
//                 : "New Appointment Suggestion";
//         } else {
//             return isNewPatient
//                 ? "Registration Confirmation"
//                 : "Appointment Suggestion Confirmation";
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             <div style={headerStyle}>
//                 <h1>{getHeaderText()}</h1>
//             </div>
//             <div style={contentStyle}>
//                 <p>
//                     {isDoctor
//                         ? `${name} just ${
//                               isNewPatient
//                                   ? "sent a registration"
//                                   : "suggested an appointment"
//                           }. Here are the details we've received:`
//                         : `Thank you for ${
//                               isNewPatient ? "registering with" : "contacting"
//                           } Four Square Clinicals. Here are the details we've received:`}
//                 </p>
//                 <p>
//                     <strong>Name:</strong> {name}
//                 </p>
//                 <p>
//                     <strong>Email:</strong> {email}
//                 </p>
//                 <p>
//                     <strong>Phone:</strong> {phone}
//                 </p>
//                 <p>
//                     <strong>Reason for Visit:</strong> {reason}
//                 </p>
//                 {isNewPatient && (
//                     <div>
//                         {gad7_score && (
//                             <p>
//                                 <strong>GAD-7 Score:</strong> {gad7_score}
//                             </p>
//                         )}
//                         {phq9_score && (
//                             <p>
//                                 <strong>PHQ-9 Score:</strong> {phq9_score}
//                             </p>
//                         )}
//                         {asrs_score && (
//                             <p>
//                                 <strong>ASRS Score:</strong> {asrs_score}
//                             </p>
//                         )}
//                         {dast_score && (
//                             <p>
//                                 <strong>DAST Score:</strong> {dast_score}
//                             </p>
//                         )}
//                     </div>
//                 )}
//                 {appointmentDate && appointmentTime && (
//                     <>
//                         <h2>
//                             {isDoctor ? `${name}'s ` : "Your "} Suggested
//                             Appointment
//                         </h2>
//                         <p>
//                             The suggested appointment time is {appointmentDate}{" "}
//                             at {appointmentTime}.
//                         </p>
//                     </>
//                 )}
//                 <p>
//                     {isDoctor
//                         ? `${name} will be expecting a call from you soon to ${
//                               isNewPatient
//                                   ? "confirm the registration"
//                                   : "discuss the appointment suggestion"
//                           } and provide further information.`
//                         : `We will contact you soon to ${
//                               isNewPatient
//                                   ? "confirm your registration"
//                                   : "discuss your appointment suggestion"
//                           } and provide further information.`}
//                 </p>
//                 {isDoctor && isNewPatient && (
//                     <p>
//                         Please review the attached PDF for additional
//                         information.
//                     </p>
//                 )}
//                 <p style={footerStyle}>
//                     If you have any questions, please contact us at{" "}
//                     <a href="mailto:info@fsclinicals.com">
//                         info@fsclinicals.com
//                     </a>{" "}
//                     or <a href="tel:(775) 238-3082">(775) 238-3082</a>.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default EmailTemplate;
