"use server";

import { prisma as client } from "@/lib/client/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";

/**
 * Retrieves a customer's questions/answers by customer ID.
 */
export const onDomainCustomerResponses = async (customerId: string) => {
	try {
		const customerQuestions = await client.customer.findUnique({
			where: { id: customerId },
			select: {
				email: true,
				questions: {
					select: {
						id: true,
						question: true,
						answered: true,
					},
				},
			},
		});
		if (customerQuestions) {
			return customerQuestions;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves all bookings for a specific domain.
 */
export const onGetAllDomainBookings = async (domainId: string) => {
	try {
		const bookings = await client.bookings.findMany({
			where: { domainId },
			select: {
				slot: true,
				date: true,
			},
		});
		if (bookings) {
			return bookings;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Books a new appointment for a customer (by domain and customer IDs).
 */
export const onBookNewAppointment = async (
	domainId: string,
	customerId: string,
	slot: string,
	date: string,
	email: string
) => {
	try {
		const booking = await client.customer.update({
			where: { id: customerId },
			data: {
				booking: {
					create: {
						domainId,
						slot,
						date,
						email,
					},
				},
			},
		});
		if (booking) {
			return { status: 200, message: "Booking created" };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Saves answers for the specified customer’s questions.
 * Expects `questions` to be an object: { questionId: answer }
 */
export const saveAnswers = async (
	questions: Record<string, string>,
	customerId: string
) => {
	try {
		for (const questionId in questions) {
			await client.customer.update({
				where: { id: customerId },
				data: {
					questions: {
						update: {
							where: { id: questionId },
							data: { answered: questions[questionId] },
						},
					},
				},
			});
		}
		return { status: 200, message: "Updated Responses" };
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves all bookings for the authenticated user, based on domain ownership.
 */
export const onGetAllBookingsForCurrentUser = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		// Find all bookings where the Customer's Domain belongs to the current user
		const bookings = await client.bookings.findMany({
			where: {
				Customer: {
					Domain: {
						userId: session.user.id, // checking Domain user ownership
					},
				},
			},
			select: {
				id: true,
				slot: true,
				createdAt: true,
				date: true,
				email: true,
				domainId: true,
				Customer: {
					select: {
						Domain: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		if (bookings) {
			return { bookings };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves a count of all appointments for the authenticated user.
 */
export const getUserAppointments = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		const bookingsCount = await client.bookings.count({
			where: {
				Customer: {
					Domain: {
						userId: session.user.id,
					},
				},
			},
		});
		return bookingsCount;
	} catch (error) {
		console.log(error);
	}
};
