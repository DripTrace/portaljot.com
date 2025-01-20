import React from "react";

interface FeedbackEmailTemplateProps {
    name: string;
    email: string;
    phone: string;
    rating: number;
    feedbackType: string;
    comment: string;
    additionalFields: {
        [key: string]: string | number;
    };
    isFeedback: boolean;
    isDoctor: boolean;
}

const FeedbackEmailTemplate: React.FC<FeedbackEmailTemplateProps> = ({
    name,
    email,
    phone,
    rating,
    feedbackType,
    comment,
    additionalFields,
    isFeedback,
    isDoctor,
}) => {
    const containerStyle = {
        fontFamily: "Arial, sans-serif",
        color: "#494949",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    };

    const headerStyle = {
        backgroundColor: isDoctor ? "#0C3C60" : "#6EA4CE",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "8px 8px 0 0",
        textAlign: "center" as const,
    };

    const contentStyle = {
        padding: "20px",
    };

    const sectionStyle = {
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    };

    const labelStyle = {
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#0C3C60",
    };

    const valueStyle = {
        marginBottom: "10px",
    };

    const ratingStyle = {
        display: "flex",
        alignItems: "center",
    };

    const starStyle = (filled: boolean) => ({
        color: filled ? "#FFC107" : "#E2E8F0",
        marginRight: "2px",
    });

    const renderStars = (rating: number) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <span key={star} style={starStyle(star <= rating)}>
                ★
            </span>
        ));
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1>
                    {isDoctor
                        ? "New Patient Feedback Submission"
                        : "Thank You for Your Feedback"}
                </h1>
            </div>
            <div style={contentStyle}>
                {isDoctor ? (
                    <>
                        <p>Dear Healthcare Provider,</p>
                        <p>
                            A new patient feedback has been submitted. Please
                            review the details below:
                        </p>
                    </>
                ) : (
                    <>
                        <p>Dear {name},</p>
                        <p>
                            Thank you for taking the time to provide your
                            feedback to Loma Linda Psychiatric Medical Group.
                            Your input is invaluable in helping us improve our
                            services and ensure the best care for all our
                            patients.
                        </p>
                    </>
                )}

                <div style={sectionStyle}>
                    <h2 style={labelStyle}>Feedback Details</h2>
                    {isDoctor && (
                        <p style={valueStyle}>
                            <strong>Patient Name:</strong> {name}
                        </p>
                    )}
                    {isDoctor && (
                        <p style={valueStyle}>
                            <strong>Patient Email:</strong> {email}
                        </p>
                    )}
                    {isDoctor && (
                        <p style={valueStyle}>
                            <strong>Patient Phone:</strong>{" "}
                            {phone || "Not provided"}
                        </p>
                    )}
                    <p style={valueStyle}>
                        <strong>Feedback Type:</strong> {feedbackType}
                    </p>
                    <div style={valueStyle}>
                        <strong>Rating:</strong>
                        <div style={ratingStyle}>
                            {renderStars(rating)}
                            <span style={{ marginLeft: "10px" }}>
                                {rating}/5
                            </span>
                        </div>
                    </div>
                    <p style={valueStyle}>
                        <strong>Comment:</strong>
                    </p>
                    <p style={{ ...valueStyle, whiteSpace: "pre-wrap" }}>
                        {comment}
                    </p>
                </div>

                {Object.keys(additionalFields).length > 0 && (
                    <div style={sectionStyle}>
                        <h2 style={labelStyle}>Additional Information</h2>
                        {Object.entries(additionalFields).map(
                            ([key, value]) => (
                                <p key={key} style={valueStyle}>
                                    <strong>{key}:</strong> {value}
                                </p>
                            )
                        )}
                    </div>
                )}

                {isDoctor ? (
                    <>
                        <p>
                            Please review this feedback carefully and consider
                            any necessary actions or improvements based on the
                            patient&apos;s comments.
                        </p>
                        <p>
                            If you need to follow up with the patient, please
                            use the contact information provided above.
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            We want to assure you that your feedback will be
                            carefully reviewed by our team. Your insights help
                            us continually enhance the quality of care and
                            service we provide.
                        </p>
                        <p>
                            If you&apos;ve raised any specific concerns or
                            questions in your feedback, a member of our team may
                            reach out to you for further discussion.
                        </p>
                    </>
                )}

                <p
                    style={{
                        fontSize: "12px",
                        color: "#888",
                        marginTop: "20px",
                    }}
                >
                    {isDoctor
                        ? "If you have any questions about this feedback or need assistance in addressing it, please contact the administration office."
                        : "If you have any further questions or would like to discuss your feedback in more detail, please don&apos;t hesitate to contact us at (909) 792-6262 or llpmg@lomalindapsych.com."}
                </p>
            </div>
        </div>
    );
};

export default FeedbackEmailTemplate;
