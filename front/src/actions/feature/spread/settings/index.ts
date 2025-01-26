"use server";

import { prisma as client } from "@/lib/client/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import bcrypt from "bcryptjs"; // Ensure bcrypt is installed
import { SUBSCRIPTION_PLAN } from "@prisma/client"; // Import enums from Prisma

/**
 * Hashes a password using bcrypt.
 */
const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
};

/**
 * Integrates a new domain for the authenticated user.
 */
export const onIntegrateDomain = async (domain: string, icon: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		// Fetch subscription plan from user's subscription
		const subscription = await client.subscription.findUnique({
			where: { userId: session.user.id },
			select: { plan: true },
		});
		const userPlan = subscription?.plan; // 'STANDARD' | 'PRO' | 'ULTIMATE'

		const domainExists = await client.domain.findFirst({
			where: {
				userId: session.user.id,
				name: domain,
			},
		});
		if (domainExists) {
			return { status: 400, message: "Domain already exists" };
		}

		let allowedDomains = 0;
		if (userPlan === SUBSCRIPTION_PLAN.FREE) allowedDomains = 1;
		else if (userPlan === SUBSCRIPTION_PLAN.PRO) allowedDomains = 5;
		else if (userPlan === SUBSCRIPTION_PLAN.ULTIMATE) allowedDomains = 10;

		const domainCount = await client.domain.count({
			where: { userId: session.user.id },
		});
		if (domainCount >= allowedDomains) {
			return {
				status: 400,
				message:
					"You've reached the maximum number of domains for your plan",
			};
		}

		const newDomain = await client.domain.create({
			data: {
				name: domain,
				icon,
				userId: session.user.id,
				chatBot: {
					create: {
						welcomeMessage:
							"Hey there, have a question? Text us here",
					},
				},
			},
		});
		if (newDomain) {
			return { status: 200, message: "Domain successfully added" };
		}
		return { status: 500, message: "Failed to add domain" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves the subscription plan for the authenticated user.
 */
export const onGetSubscriptionPlan = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const plan = await client.subscription.findUnique({
			where: { userId: session.user.id },
			select: { plan: true },
		});
		return { plan: plan?.plan };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Updates the user's password after hashing it.
 */
export const onUpdatePassword = async (password: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const hashedPassword = await hashPassword(password);
		const update = await client.user.update({
			where: { id: session.user.id },
			data: { password: hashedPassword },
		});
		if (update) {
			return { status: 200, message: "Password updated" };
		}
		return { status: 500, message: "Failed to update password" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves all domains for the authenticated user.
 */
export const onGetAllAccountDomains = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const domains = await client.domain.findMany({
			where: { userId: session.user.id },
			select: {
				id: true,
				name: true,
				icon: true,
				customer: {
					select: {
						chatRoom: {
							select: {
								id: true,
								live: true,
							},
						},
					},
				},
			},
		});
		return { status: 200, domains };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves information about the current domain by name.
 */
export const onGetCurrentDomainInfo = async (domain: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const userDomain = await client.domain.findFirst({
			where: {
				userId: session.user.id,
				name: { contains: domain },
			},
			select: {
				id: true,
				name: true,
				icon: true,
				userId: true,
				products: {
					select: {
						id: true,
						name: true,
						image: true,
						price: true,
						type: true,
						description: true,
						printfulId: true,
					},
				},
				chatBot: {
					select: {
						id: true,
						welcomeMessage: true,
						icon: true,
					},
				},
			},
		});
		return { status: 200, userDomain };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Updates a domain's name by ID.
 */
export const onUpdateDomain = async (id: string, name: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const domainExists = await client.domain.findFirst({
			where: {
				name: { contains: name },
				userId: session.user.id,
			},
		});
		if (domainExists) {
			return {
				status: 400,
				message: "Domain with this name already exists",
			};
		}

		const updatedDomain = await client.domain.update({
			where: { id },
			data: { name },
		});
		if (updatedDomain) {
			return { status: 200, message: "Domain updated" };
		}
		return { status: 500, message: "Failed to update domain" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Updates the chatbot's icon image for a domain.
 */
export const onChatBotImageUpdate = async (id: string, icon: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const updated = await client.chatBot.update({
			where: { domainId: id },
			data: { icon },
		});
		if (updated) {
			return { status: 200, message: "ChatBot icon updated" };
		}
		return { status: 500, message: "Failed to update ChatBot icon" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Updates the chatbot's welcome message for a domain.
 */
export const onUpdateWelcomeMessage = async (
	message: string,
	domainId: string
) => {
	try {
		const update = await client.chatBot.update({
			where: { domainId },
			data: { welcomeMessage: message },
		});
		if (update) {
			return { status: 200, message: "Welcome message updated" };
		}
		return { status: 500, message: "Failed to update welcome message" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Deletes a user's domain if it belongs to them.
 */
export const onDeleteUserDomain = async (id: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		// Verify domain belongs to user
		const validDomain = await client.domain.findUnique({
			where: { id },
			select: { userId: true, name: true },
		});
		if (!validDomain || validDomain.userId !== session.user.id) {
			return { status: 400, message: "Domain not found or not yours" };
		}

		const deletedDomain = await client.domain.delete({
			where: { id },
			select: { name: true },
		});
		if (deletedDomain) {
			return {
				status: 200,
				message: `${deletedDomain.name} was deleted successfully`,
			};
		}
		return { status: 500, message: "Failed to delete domain" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Creates a new help desk question for a domain.
 */
export const onCreateHelpDeskQuestion = async (
	id: string,
	question: string,
	answer: string
) => {
	try {
		const helpDeskQuestion = await client.helpDesk.create({
			data: {
				domainId: id,
				question,
				answer,
			},
			select: {
				id: true,
				question: true,
				answer: true,
			},
		});
		if (helpDeskQuestion) {
			return {
				status: 200,
				message: "New help desk question added",
				question: helpDeskQuestion,
			};
		}
		return { status: 500, message: "Failed to add help desk question" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves all help desk questions for a domain.
 */
export const onGetAllHelpDeskQuestions = async (id: string) => {
	try {
		const questions = await client.helpDesk.findMany({
			where: { domainId: id },
			select: {
				question: true,
				answer: true,
				id: true,
			},
		});
		return {
			status: 200,
			message: "Help desk questions retrieved successfully",
			questions,
		};
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Creates a new filter question for a domain.
 */
export const onCreateFilterQuestions = async (id: string, question: string) => {
	try {
		const filterQuestion = await client.filterQuestions.create({
			data: {
				domainId: id,
				question,
			},
			select: {
				id: true,
				question: true,
			},
		});
		if (filterQuestion) {
			return {
				status: 200,
				message: "Filter question added",
				question: filterQuestion,
			};
		}
		return { status: 500, message: "Failed to add filter question" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves all filter questions for a domain.
 */
export const onGetAllFilterQuestions = async (id: string) => {
	try {
		const questions = await client.filterQuestions.findMany({
			where: { domainId: id },
			select: {
				id: true,
				question: true,
			},
			orderBy: {
				question: "asc",
			},
		});
		return {
			status: 200,
			message: "Filter questions retrieved successfully",
			questions,
		};
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Retrieves the Stripe ID of the authenticated user.
 */
export const onGetPaymentConnected = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return { status: 401, message: "Unauthorized" };

		const connected = await client.user.findUnique({
			where: { id: session.user.id },
			select: { stripeId: true },
		});
		return { stripeId: connected?.stripeId || null };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};

/**
 * Creates a new product for a domain, parsing printfulId as an integer if the schema has `Int printfulId`.
 */
export const onCreateNewDomainProduct = async (
	id: string,
	name: string,
	image: string,
	price: string,
	type: string,
	description: string,
	printfulId: string
) => {
	try {
		const product = await client.product.create({
			data: {
				domainId: id,
				name,
				image,
				price: parseFloat(price),
				type,
				description,
				printfulId: parseInt(printfulId, 10),
			},
		});
		if (product) {
			return { status: 200, message: "Product successfully created" };
		}
		return { status: 500, message: "Failed to create product" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal Server Error" };
	}
};
