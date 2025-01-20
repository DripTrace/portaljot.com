"use client";

import {
    ContactForm,
    ErrorMessage,
    FormSubmit,
    FormWrapper,
    Input,
    Label,
    MessageArea,
    MessagePrompt,
    MessageReport,
    Separator,
    SubmitButton,
    SubmitIcon,
    SuccessMessage,
} from "./ContactElements";
import { useState } from "react";

// Define the type for the errors state
type Errors = {
    fullname?: boolean;
    email?: boolean;
    subject?: boolean;
    message?: boolean;
};

const Contact = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<Errors>({});

    const [buttonText, setButtonText] = useState("Send");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const handleValidation = (): boolean => {
        let tempErrors: Errors = {};
        let isValid = true;

        if (fullname.length <= 0) {
            tempErrors["fullname"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors["subject"] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors["message"] = true;
            isValid = false;
        }

        setErrors(tempErrors);
        console.log("errors", errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText("Sending");
            const res = await fetch("/api/sendgrid", {
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: subject,
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { error } = await res.json();
            if (error) {
                console.log(error);
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText("Send");

                // Reset form fields
                setFullname("");
                setEmail("");
                setMessage("");
                setSubject("");
                return;
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText("Send");
            setFullname("");
            setEmail("");
            setMessage("");
            setSubject("");
        }

        console.log(fullname, email, subject, message);
    };

    return (
        <>
            <FormWrapper>
                <ContactForm onSubmit={handleSubmit}>
                    <MessagePrompt>Send a message</MessagePrompt>

                    <Label htmlFor="fullname">
                        Full Name
                        <Separator>*</Separator>
                    </Label>
                    <Input
                        type="text"
                        value={fullname}
                        onChange={(e) => {
                            setFullname(e.target.value);
                        }}
                        name="fullname"
                        placeholder="enter your full name"
                    />
                    {errors.fullname && (
                        <ErrorMessage>Fullname cannot be empty.</ErrorMessage>
                    )}
                    <Label htmlFor="email">
                        E-Mail
                        <Separator>*</Separator>
                    </Label>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="enter your e-mail"
                    />
                    {errors.email && (
                        <ErrorMessage>E-Mail cannot be empty.</ErrorMessage>
                    )}
                    <Label htmlFor="subject">
                        Subject
                        <Separator>*</Separator>
                    </Label>
                    <Input
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        placeholder="enter the message subject"
                    />
                    {errors.subject && (
                        <ErrorMessage>Subject cannot be empty.</ErrorMessage>
                    )}
                    <Label htmlFor="message">
                        Message
                        <Separator>*</Separator>
                    </Label>
                    <MessageArea
                        name="message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        placeholder="type your message here"
                    />
                    {errors.message && (
                        <ErrorMessage>Message cannot be empty.</ErrorMessage>
                    )}
                    <FormSubmit>
                        <SubmitButton type="submit">
                            {buttonText}
                            <SubmitIcon
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                                    fill="currentColor"
                                />
                            </SubmitIcon>
                        </SubmitButton>
                        <MessageReport>
                            {showSuccessMessage && (
                                <SuccessMessage>
                                    Thank you! Your Message has been delivered.
                                </SuccessMessage>
                            )}
                            {showFailureMessage && (
                                <ErrorMessage>
                                    Oops! Something went wrong, please try
                                    again.
                                </ErrorMessage>
                            )}
                        </MessageReport>
                    </FormSubmit>
                </ContactForm>
            </FormWrapper>
        </>
    );
};

export default Contact;
