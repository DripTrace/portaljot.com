"use server";

import { prisma as client } from "@/lib/client/prisma";
import nodemailer from "nodemailer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";

/**
 * Retrieves all customers for the authenticated user (based on domain ownership).
 */
export const onGetAllCustomers = async (userId: string) => {
	try {
		if (!userId) return null;

		// Example: find all domains for user, then gather their customers
		const customers = await client.user.findUnique({
			where: { id: userId },
			select: {
				subscription: {
					select: {
						credits: true,
						plan: true,
					},
				},
				domains: {
					select: {
						customer: {
							select: {
								id: true,
								email: true,
								Domain: {
									select: {
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return customers;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves all campaigns for the authenticated user.
 */
export const onGetAllCampaigns = async (userId: string) => {
	try {
		if (!userId) return null;

		const campaigns = await client.user.findUnique({
			where: { id: userId },
			select: {
				campaign: {
					select: {
						name: true,
						id: true,
						customers: true,
						createdAt: true,
					},
				},
			},
		});
		return campaigns;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Creates a new marketing campaign for the authenticated user.
 */
export const onCreateMarketingCampaign = async (name: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		// Assuming `campaign` is a one-to-many on your user
		const campaign = await client.user.update({
			where: { id: session.user.id },
			data: {
				campaign: {
					create: { name },
				},
			},
		});
		if (campaign) {
			return { status: 200, message: "Your campaign was created" };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Saves an email template on the given campaign.
 */
export const onSaveEmailTemplate = async (
	template: string,
	campaignId: string
) => {
	try {
		await client.campaign.update({
			where: { id: campaignId },
			data: { template },
		});
		return { status: 200, message: "Email template created" };
	} catch (error) {
		console.log(error);
	}
};

/**
 * Adds customers to an email campaign.
 * If `customers` is an array of email strings,
 * your `campaign.customers` field might be an array of strings in the Prisma schema.
 */
export const onAddCustomersToEmail = async (
	customers: string[],
	campaignId: string
) => {
	try {
		const update = await client.campaign.update({
			where: { id: campaignId },
			data: {
				customers: {
					set: customers, // if your `customers` is a string[] field
				},
			},
		});
		if (update) {
			return { status: 200, message: "Customers added to campaign" };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Sends bulk emails for a campaign using nodemailer.
 */
export const onBulkMailer = async (emails: string[], campaignId: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		// get the template for this campaign
		const template = await client.campaign.findUnique({
			where: { id: campaignId },
			select: {
				name: true,
				template: true,
			},
		});
		if (template && template.template) {
			const transporter = nodemailer.createTransport({
				service: "Gmail",
				host: "smtp.gmail.com",
				port: 465,
				secure: true,
				auth: {
					user: process.env.NODE_MAILER_EMAIL,
					pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
				},
			});

			const mailOptions = {
				to: emails,
				subject: template.name,
				text: template.template,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});

			// Decrement credits
			await client.user.update({
				where: { id: session.user.id },
				data: {
					subscription: {
						update: {
							credits: {
								decrement: emails.length,
							},
						},
					},
				},
			});
			return { status: 200, message: "Campaign emails sent" };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves all question/answers for a specific customer from your DB.
 */
export const onGetAllCustomerResponses = async (customerId: string) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		// For example, find that customer’s answered questions
		const answers = await client.customer.findUnique({
			where: { id: customerId },
			select: {
				questions: {
					where: {
						answered: { not: null },
					},
					select: {
						question: true,
						answered: true,
					},
				},
			},
		});
		if (answers) {
			return answers.questions;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves the email template for a campaign by ID.
 */
export const onGetEmailTemplate = async (campaignId: string) => {
	try {
		const template = await client.campaign.findUnique({
			where: { id: campaignId },
			select: {
				template: true,
			},
		});
		return template?.template;
	} catch (error) {
		console.log(error);
	}
};
