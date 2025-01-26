// src/components/spread/email-marketing/answers.tsx

"use client";

import { useAnswers } from "@/hooks/spread/email-marketing/use-marketing";
import React from "react";
import { Loader } from "../loader";
import { CardDescription } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Question = {
	question: string;
	answered: string | null;
};

type CustomerAnswer = {
	customer: {
		id: string;
		questions: Question[];
	};
};

type CustomerQuestions = CustomerAnswer[];

type Props = {
	id?: string;
};

const Answers = ({ id }: Props) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Handle authentication states
	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		router.push("/auth/signin"); // Redirect unauthenticated users to sign-in
		return null;
	}

	// Ensure 'id' is provided
	if (!id) {
		return <p>No customer ID provided.</p>;
	}

	const { answers, loading } = useAnswers(id);

	return (
		<div className="flex flex-col gap-5 mt-10">
			<Loader loading={loading}>
				{answers.length === 0 ? (
					<p>No answers available.</p>
				) : (
					answers.map((answer) => (
						<div key={answer.customer.id} className="mb-4">
							{answer.customer.questions.length > 0 ? (
								answer.customer.questions.map(
									(question, key) => (
										<div
											key={key}
											className="p-4 border rounded-md shadow-sm"
										>
											<p className="font-semibold">
												Question:
											</p>
											<p>{question.question}</p>
											<CardDescription className="mt-2">
												{question.answered ||
													"No answer yet."}
											</CardDescription>
										</div>
									)
								)
							) : (
								<p>No questions available for this customer.</p>
							)}
						</div>
					))
				)}
			</Loader>
		</div>
	);
};

export default Answers;
