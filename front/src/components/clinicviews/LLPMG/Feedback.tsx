"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send } from "lucide-react";

type FeedbackType =
    | "patientCare"
    | "customerService"
    | "siteNavigation"
    | "other";

type AdditionalQuestion = {
    key: string;
    label: string;
    type: "text" | "rating";
};

type AdditionalQuestions = {
    [key in FeedbackType]: AdditionalQuestion[];
};

type AdditionalFields = {
    [key: string]: string | number;
};

const FeedbackPage: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [feedbackType, setFeedbackType] = useState<FeedbackType | "">("");
    const [additionalFields, setAdditionalFields] = useState<AdditionalFields>(
        {}
    );
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const feedbackTypes = [
        { value: "patientCare", label: "Patient Care" },
        { value: "customerService", label: "Customer Service" },
        { value: "siteNavigation", label: "Website Navigation" },
        { value: "other", label: "Other" },
    ];

    const additionalQuestions: AdditionalQuestions = {
        patientCare: [
            { key: "doctorName", label: "Doctor's Name", type: "text" },
            {
                key: "treatmentEffectiveness",
                label: "Treatment Effectiveness",
                type: "rating",
            },
        ],
        customerService: [
            {
                key: "staffMember",
                label: "Staff Member's Name (if known)",
                type: "text",
            },
            { key: "responseTime", label: "Response Time", type: "rating" },
        ],
        siteNavigation: [
            { key: "easeOfUse", label: "Ease of Use", type: "rating" },
            {
                key: "suggestedImprovement",
                label: "Suggested Improvement",
                type: "text",
            },
        ],
        other: [{ key: "subject", label: "Subject", type: "text" }],
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/llpmg/feedback/route", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating,
                    comment,
                    feedbackType,
                    additionalFields,
                    name,
                    email,
                    phone,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                setError(
                    errorData.error ||
                        "An error occurred while submitting feedback"
                );
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setError(
                "An error occurred while submitting feedback. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFeedbackTypeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFeedbackType(e.target.value as FeedbackType);
        setAdditionalFields({});
    };

    const renderAdditionalFields = () => {
        if (!feedbackType) return null;

        return additionalQuestions[feedbackType].map(
            (question: AdditionalQuestion) => (
                <div key={question.key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {question.label}
                    </label>
                    {question.type === "text" ? (
                        <input
                            title="question type"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) =>
                                setAdditionalFields({
                                    ...additionalFields,
                                    [question.key]: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Star
                                    key={value}
                                    size={24}
                                    fill={
                                        Number(
                                            additionalFields[question.key]
                                        ) >= value
                                            ? "#FFC107"
                                            : "none"
                                    }
                                    stroke={
                                        Number(
                                            additionalFields[question.key]
                                        ) >= value
                                            ? "#FFC107"
                                            : "#E2E8F0"
                                    }
                                    className="cursor-pointer mr-1"
                                    onClick={() =>
                                        setAdditionalFields({
                                            ...additionalFields,
                                            [question.key]: value,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            )
        );
    };

    return (
        <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300">
                <AnimatePresence>
                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-300 text-center mb-6">
                                    Your Feedback Matters
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                                    Help us improve our services by sharing your
                                    experience
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Your Name
                                </label>
                                <input
                                    title="name"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Your Email
                                </label>
                                <input
                                    title="email"
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Your Phone (optional)
                                </label>
                                <input
                                    title="phone number"
                                    type="tel"
                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Overall Rating
                                </label>
                                <div className="flex justify-center">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Star
                                            key={value}
                                            size={32}
                                            fill={
                                                rating >= value
                                                    ? "#FFC107"
                                                    : "none"
                                            }
                                            stroke={
                                                rating >= value
                                                    ? "#FFC107"
                                                    : "#E2E8F0"
                                            }
                                            className="cursor-pointer mr-2 transition-all duration-200 hover:scale-110"
                                            onClick={() => setRating(value)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Your Comment
                                </label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us about your experience..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Type of Feedback
                                </label>
                                <select
                                    title="feedback type"
                                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                    value={feedbackType}
                                    onChange={handleFeedbackTypeChange}
                                    required
                                >
                                    <option value="">
                                        Select feedback type
                                    </option>
                                    {feedbackTypes.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <AnimatePresence>
                                {feedbackType && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4"
                                    >
                                        {renderAdditionalFields()}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                ) : (
                                    <Send className="mr-2" size={20} />
                                )}
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Feedback"}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <ThumbsUp
                                className="mx-auto text-green-500 mb-4"
                                size={64}
                            />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Thank You for Your Feedback!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your input helps us improve our services.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FeedbackPage;
