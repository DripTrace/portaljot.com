"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust path if needed
import { db } from "./db";
import { redirect } from "next/navigation";
import { v4 } from "uuid";
import {
	Agency,
	Lane,
	Plan,
	Prisma,
	Role,
	SubAccount,
	Tag,
	Ticket,
	User,
} from "@prisma/client";
import {
	CreateFunnelFormSchema,
	CreateMediaType,
	UpsertFunnelPage,
} from "./types";
import { z } from "zod";
import { prisma } from "@/lib/client/prisma";
import { revalidatePath } from "next/cache";

/** Retrieve NextAuth session. Adjust your import for the authOptions path. */
async function getSession() {
	return await getServerSession(authOptions);
}

/** Gets the authenticated user from DB using session.email. */
export const getAuthUserDetails = async (userEmail) => {
	const session = await getSession();
	if (!session?.user?.email !== userEmail) {
		return null;
	}

	const userData = await db.user.findUnique({
		where: {
			email: userEmail,
		},
		include: {
			Agency: {
				include: {
					SidebarOption: true,
					subAccounts: {
						include: {
							SidebarOption: true,
						},
					},
				},
			},
			Permissions: true,
		},
	});

	return userData;
};

/** Logs an activity notification, referencing the current or fallback user. */
export const saveActivityLogsNotification = async ({
	agencyId,
	description,
	subaccountId,
}: {
	agencyId?: string;
	description: string;
	subaccountId?: string;
}) => {
	const session = await getSession();
	let userData: User | null = null;

	// Attempt to find user by session email:
	if (session?.user?.email) {
		userData = await db.user.findUnique({
			where: { email: session.user.email },
		});
	}

	// If no session user found, fallback to a user in that subaccount
	if (!userData && subaccountId) {
		const fallbackUser = await db.user.findFirst({
			where: {
				Agency: {
					subAccounts: {
						some: { id: subaccountId },
					},
				},
			},
		});
		userData = fallbackUser;
	}

	if (!userData) {
		console.log("Could not find a user to log the activity.");
		return;
	}

	let foundAgencyId = agencyId;
	if (!foundAgencyId && subaccountId) {
		const sub = await db.subAccount.findUnique({
			where: { id: subaccountId },
		});
		if (sub) foundAgencyId = sub.agencyId ?? undefined;
	}

	if (!foundAgencyId) {
		throw new Error("Must provide at least an agencyId or a subaccountId.");
	}

	if (subaccountId) {
		await db.notification.create({
			data: {
				notification: `${userData.name} | ${description}`,
				User: { connect: { id: userData.id } },
				Agency: { connect: { id: foundAgencyId } },
				SubAccount: { connect: { id: subaccountId } },
			},
		});
	} else {
		await db.notification.create({
			data: {
				notification: `${userData.name} | ${description}`,
				User: { connect: { id: userData.id } },
				Agency: { connect: { id: foundAgencyId } },
			},
		});
	}
};

/** Create a team user if role != AGENCY_OWNER. Provide all required fields. */
export const createTeamUser = async (agencyId: string, user: Partial<User>) => {
	if (user.role === "AGENCY_OWNER") {
		return null;
	}

	// Fill in missing required fields for the User schema:
	const newUser = await db.user.create({
		data: {
			id: user.id ?? crypto.randomUUID(),
			idDirect: user.idDirect ?? null,
			clerkId: user.clerkId ?? null,
			emailVerified: user.emailVerified ?? null,
			image: user.image ?? null,
			password: user.password ?? null,
			firstname: user.firstname ?? null,
			lastname: user.lastname ?? null,
			rRole: user.rRole ?? null,
			stripeId: user.stripeId ?? null,
			customerId: user.customerId ?? null,
			username: user.username ?? null,
			modifyId: user.modifyId ?? null,
			registeredInfo: user.registeredInfo ?? null,
			shipping: user.shipping ?? null,
			neccessary_actions: user.neccessary_actions ?? null,
			personal_info: user.personal_info ?? null,
			verification: user.verification ?? null,
			company_verification: user.company_verification ?? null,
			individual_verification: user.individual_verification ?? null,
			stripe_metadata: user.stripe_metadata ?? null,
			stripeBalance: user.stripeBalance ?? null,
			external_accounts: user.external_accounts ?? null,
			avatarUrl: user.avatarUrl ?? null,
			name: user.name ?? "New Team User",
			email: user.email ?? "",
			role: user.role ?? "SUBACCOUNT_USER",
			agencyId: agencyId ?? null,
			type: user.type ?? "TEAM_USER",

			// auto fields
			createdAt: user.createdAt ?? new Date(),
			updatedAt: user.updatedAt ?? new Date(),
		},
	});

	return newUser;
};

/** Verifies invitation for the current NextAuth user and accepts it. */
export const verifyAndAcceptInvitation = async () => {
	const session = await getSession();
	if (!session?.user?.email) {
		return redirect("/nexusconjure/sign-in");
	}

	const invitationExists = await db.invitation.findUnique({
		where: {
			email: session.user.email ?? undefined,
			status: "PENDING",
		},
	});

	if (invitationExists) {
		// create user in DB
		const userDetails = await createTeamUser(invitationExists.agencyId, {
			email: invitationExists.email ?? undefined,
			agencyId: invitationExists.agencyId ?? undefined,
			avatarUrl: session.user.image ?? null,
			id: crypto.randomUUID(),
			name: session.user.name ?? "Invited User",
			role: invitationExists.role,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await saveActivityLogsNotification({
			agencyId: invitationExists.agencyId ?? undefined,
			description: "Joined",
		});

		if (userDetails) {
			// Delete invitation
			await db.invitation.delete({
				where: { email: invitationExists.email ?? undefined },
			});
			return userDetails.agencyId;
		}
		return null;
	} else {
		// no invitation found => check if user already has an agency
		const existing = await db.user.findUnique({
			where: {
				email: session.user.email,
			},
		});
		return existing ? existing.agencyId : null;
	}
};

/** Update an agency's details. */
export const updateAgencyDetails = async (
	agencyId: string,
	agencyDetails: Partial<Agency>
) => {
	return await db.agency.update({
		where: { id: agencyId },
		data: { ...agencyDetails },
	});
};

/** Delete an agency by ID. */
export const deleteAgency = async (agencyId: string) => {
	return await db.agency.delete({ where: { id: agencyId } });
};

/** Initialize user in DB from the NextAuth session. */
export const initUser = async (newUser: Partial<User>) => {
	const session = await getSession();
	if (!session?.user?.email) return;

	const userData = await db.user.upsert({
		where: {
			email: session.user.email,
		},
		update: {
			...newUser,
		},
		create: {
			// Provide defaults for required fields
			id: crypto.randomUUID(),
			idDirect: null,
			clerkId: null,
			emailVerified: null,
			image: null,
			password: null,
			firstname: null,
			lastname: null,
			rRole: null,
			stripeId: null,
			customerId: null,
			username: null,
			modifyId: null,
			registeredInfo: null,
			shipping: null,
			neccessary_actions: null,
			personal_info: null,
			verification: null,
			company_verification: null,
			individual_verification: null,
			stripe_metadata: null,
			stripeBalance: null,
			external_accounts: null,
			avatarUrl: session.user.image ?? null,
			name: session.user.name ?? "New User",
			email: session.user.email,
			role: newUser.role || "SUBACCOUNT_USER",
			type: "INIT_USER",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	return userData;
};

/** Creates or updates an Agency. */
export const upsertAgency = async (agency: Agency, price?: Plan) => {
	if (!agency.companyEmail) return null;
	try {
		const agencyDetails = await db.agency.upsert({
			where: { id: agency.id },
			update: agency,
			create: {
				users: {
					connect: { email: agency.companyEmail },
				},
				...agency,
				SidebarOption: {
					create: [
						{
							name: "Dashboard",
							icon: "category",
							link: `/nexusconjure/agency/${agency.id}`,
						},
						{
							name: "Launchpad",
							icon: "clipboardIcon",
							link: `/nexusconjure/agency/${agency.id}/launchpad`,
						},
						{
							name: "Billing",
							icon: "payment",
							link: `/nexusconjure/agency/${agency.id}/billing`,
						},
						{
							name: "Settings",
							icon: "settings",
							link: `/nexusconjure/agency/${agency.id}/settings`,
						},
						{
							name: "Sub Accounts",
							icon: "person",
							link: `/nexusconjure/agency/${agency.id}/all-subaccounts`,
						},
						{
							name: "Team",
							icon: "shield",
							link: `/nexusconjure/agency/${agency.id}/team`,
						},
					],
				},
			},
		});
		return agencyDetails;
	} catch (error) {
		console.log(error);
	}
};

/** Retrieve notifications with user data. */
export const getNotificationAndUser = async (agencyId: string) => {
	try {
		const response = await db.notification.findMany({
			where: { agencyId },
			include: { User: true },
			orderBy: { createdAt: "desc" },
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

/** Upserts a SubAccount with pipeline/permissions. */
export const upsertSubAccount = async (subAccount: SubAccount) => {
	if (!subAccount.companyEmail) return null;
	const agencyOwner = await db.user.findFirst({
		where: {
			Agency: {
				id: subAccount.agencyId || undefined,
			},
			role: "AGENCY_OWNER",
		},
	});
	if (!agencyOwner) {
		console.log(
			"🔴Error: Could not create subaccount. No agency owner found."
		);
		return null;
	}

	const permissionId = v4();
	const response = await db.subAccount.upsert({
		where: { id: subAccount.id },
		update: subAccount,
		create: {
			...subAccount,
			Permissions: {
				create: {
					access: true,
					email: agencyOwner.email ?? "",
					id: permissionId,
				},
				connect: {
					subAccountId: subAccount.id,
					id: permissionId,
				},
			},
			Pipeline: {
				create: { name: "Lead Cycle" },
			},
			SidebarOption: {
				create: [
					{
						name: "Launchpad",
						icon: "clipboardIcon",
						link: `/nexusconjure/subaccount/${subAccount.id}/launchpad`,
					},
					{
						name: "Settings",
						icon: "settings",
						link: `/nexusconjure/subaccount/${subAccount.id}/settings`,
					},
					{
						name: "Funnels",
						icon: "pipelines",
						link: `/nexusconjure/subaccount/${subAccount.id}/funnels`,
					},
					{
						name: "Media",
						icon: "database",
						link: `/nexusconjure/subaccount/${subAccount.id}/media`,
					},
					{
						name: "Automations",
						icon: "chip",
						link: `/nexusconjure/subaccount/${subAccount.id}/automations`,
					},
					{
						name: "Pipelines",
						icon: "flag",
						link: `/nexusconjure/subaccount/${subAccount.id}/pipelines`,
					},
					{
						name: "Contacts",
						icon: "person",
						link: `/nexusconjure/subaccount/${subAccount.id}/contacts`,
					},
					{
						name: "Dashboard",
						icon: "category",
						link: `/nexusconjure/subaccount/${subAccount.id}`,
					},
				],
			},
		},
	});
	return response;
};

/** Retrieves user permissions for a given user ID. */
export const getUserPermissions = async (userId: string) => {
	const response = await db.user.findUnique({
		where: { id: userId },
		select: { Permissions: { include: { SubAccount: true } } },
	});
	return response;
};

/** Updates a user in DB. Must fill required fields or default them. */
export const updateUser = async (user: Partial<User>) => {
	const response = await db.user.update({
		where: { email: user.email ?? "" },
		data: {
			...user,
			// ensure type if needed, or fallback:
			type: user.type ?? "UPDATED_USER",
		},
	});
	return response;
};

/** Changes or creates user permissions for a subaccount. */
export const changeUserPermissions = async (
	permissionId: string | undefined,
	userEmail: string,
	subAccountId: string,
	permission: boolean
) => {
	try {
		const response = await db.permissions.upsert({
			where: { id: permissionId },
			update: { access: permission },
			create: {
				access: permission,
				email: userEmail,
				subAccountId: subAccountId,
			},
		});
		return response;
	} catch (error) {
		console.log("🔴Could not change permission", error);
	}
};

/** Retrieves subaccount details by ID. */
export const getSubaccountDetails = async (subaccountId: string) => {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
	});
};

/** Deletes a subaccount by ID. */
export const deleteSubAccount = async (subaccountId: string) => {
	return await db.subAccount.delete({ where: { id: subaccountId } });
};

/** Deletes a user by ID. Must supply required fields if needed. */
export const deleteUser = async (userId: string) => {
	const deletedUser = await db.user.delete({ where: { id: userId } });
	return deletedUser;
};

/** Retrieves a user by ID. */
export const getUser = async (id: string) => {
	return await db.user.findUnique({ where: { id } });
};

/** Sends an invitation (only stored in DB). */
export const sendInvitation = async (
	role: Role,
	email: string,
	agencyId: string
) => {
	const response = await db.invitation.create({
		data: { email, agencyId, role },
	});
	return response;
};

/** Retrieves media for a given subaccount. */
export const getMedia = async (subaccountId: string) => {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
		include: { Media: true },
	});
};

/** Creates new media in DB. */
export const createMedia = async (
	subaccountId: string,
	mediaFile: CreateMediaType
) => {
	return await prisma.media.create({
		data: {
			url: mediaFile.url,
			name: mediaFile.name,
			userId: mediaFile.userId,
			agencyId: mediaFile.agencyId,
			subAccountId: subaccountId,
		},
	});
};

/** Deletes a media record by ID. */
export const deleteMedia = async (mediaId: string) => {
	return await db.media.delete({
		where: { id: mediaId },
	});
};

/** Retrieves pipeline details by ID. */
export const getPipelineDetails = async (pipelineId: string) => {
	return await db.pipeline.findUnique({
		where: { id: pipelineId },
	});
};

/** Retrieves lanes with associated tickets (ticketTags for many-to-many). */
export const getLanesWithTicketAndTags = async (pipelineId: string) => {
	const response = await db.lane.findMany({
		where: { pipelineId },
		orderBy: { order: "asc" },
		include: {
			Tickets: {
				orderBy: { order: "asc" },
				include: {
					Assigned: true,
					Customer: true,
					ticketTags: true, // rename 'Tags' → 'ticketTags' if you want the pivot data
				},
			},
		},
	});
	return response;
};

/** Creates or updates a funnel in DB. */
export const upsertFunnel = async (
	subaccountId: string,
	funnel: z.infer<typeof CreateFunnelFormSchema> & { liveProducts: string },
	funnelId: string
) => {
	return await db.funnel.upsert({
		where: { id: funnelId },
		update: funnel,
		create: {
			...funnel,
			id: funnelId || v4(),
			subAccountId: subaccountId,
		},
	});
};

/** Creates or updates a pipeline record. */
export const upsertPipeline = async (
	pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput
) => {
	return await db.pipeline.upsert({
		where: { id: pipeline.id || v4() },
		update: pipeline,
		create: pipeline,
	});
};

/** Deletes a pipeline by ID. */
export const deletePipeline = async (pipelineId: string) => {
	return await db.pipeline.delete({
		where: { id: pipelineId },
	});
};

/** Batch updates lane order. */
export const updateLanesOrder = async (lanes: Lane[]) => {
	try {
		const updateTrans = lanes.map((lane) =>
			db.lane.update({
				where: { id: lane.id },
				data: { order: lane.order },
			})
		);
		await db.$transaction(updateTrans);
		console.log("🟢 Done reordered 🟢");
	} catch (error) {
		console.log(error, "ERROR UPDATE LANES ORDER");
	}
};

/** Batch updates ticket order or lane assignment. */
export const updateTicketsOrder = async (tickets: Ticket[]) => {
	try {
		const updateTrans = tickets.map((ticket) =>
			db.ticket.update({
				where: { id: ticket.id },
				data: {
					order: ticket.order,
					laneId: ticket.laneId,
				},
			})
		);
		await db.$transaction(updateTrans);
		console.log("🟢 Done reordered 🟢");
	} catch (error) {
		console.log(error, "🔴 ERROR UPDATE TICKET ORDER");
	}
};

/** Upserts a lane. */
export const upsertLane = async (lane: Prisma.LaneUncheckedCreateInput) => {
	let order: number;
	if (!lane.order) {
		const lanes = await db.lane.findMany({
			where: { pipelineId: lane.pipelineId },
		});
		order = lanes.length;
	} else {
		order = lane.order;
	}

	return await db.lane.upsert({
		where: { id: lane.id || v4() },
		update: lane,
		create: { ...lane, order },
	});
};

/** Deletes a lane by ID. */
export const deleteLane = async (laneId: string) => {
	return await db.lane.delete({ where: { id: laneId } });
};

/** Retrieves tickets in a pipeline, including pivot 'ticketTags', etc. */
export const getTicketsWithTags = async (pipelineId: string) => {
	return await db.ticket.findMany({
		where: { Lane: { pipelineId } },
		include: {
			ticketTags: true,
			Assigned: true,
			Customer: true,
		},
	});
};

/** Retrieves tickets with all relations in a lane. */
export const _getTicketsWithAllRelations = async (laneId: string) => {
	return await db.ticket.findMany({
		where: { laneId },
		include: {
			Assigned: true,
			Customer: true,
			Lane: true,
			ticketTags: true, // many-to-many pivot
		},
	});
};

/** Retrieves subaccount team members with 'SUBACCOUNT_USER' role + permission. */
export const getSubAccountTeamMembers = async (subAccountId: string) => {
	return await db.user.findMany({
		where: {
			Agency: {
				subAccounts: {
					some: { id: subAccountId },
				},
			},
			role: "SUBACCOUNT_USER",
			Permissions: {
				some: { subAccountId, access: true },
			},
		},
	});
};

/** Searches contacts by substring. */
export const searchContacts = async (searchTerms: string) => {
	return await db.contact.findMany({
		where: { name: { contains: searchTerms } },
	});
};

/**
 * Creates or updates a Ticket.
 * 'Tags' replaced with 'ticketTags' pivot usage (remove if you don't handle tags).
 */
export const upsertTicket = async (
	ticket: Prisma.TicketUncheckedCreateInput,
	tags: Tag[]
) => {
	let order: number;
	if (!ticket.order) {
		const tickets = await db.ticket.findMany({
			where: { laneId: ticket.laneId },
		});
		order = tickets.length;
	} else {
		order = ticket.order;
	}

	// You can store pivot creation logic if needed, but let's do minimal.
	const response = await db.ticket.upsert({
		where: { id: ticket.id || v4() },
		update: {
			...ticket,
		},
		create: {
			...ticket,
			order,
		},
		include: {
			Assigned: true,
			Customer: true,
			ticketTags: true, // Pivot
			Lane: true,
		},
	});

	// Additional pivot logic if needed

	return response;
};

/** Deletes a ticket by ID. */
export const deleteTicket = async (ticketId: string) => {
	return await db.ticket.delete({ where: { id: ticketId } });
};

/** Upserts a tag for a subaccount. */
export const upsertTag = async (
	subaccountId: string,
	tag: Prisma.TagUncheckedCreateInput
) => {
	return await db.tag.upsert({
		where: { id: tag.id || v4(), subAccountId: subaccountId },
		update: tag,
		create: { ...tag, subAccountId: subaccountId },
	});
};

/** Retrieves all tags for a subaccount. */
export const getTagsForSubaccount = async (subaccountId: string) => {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
		select: { Tags: true },
	});
};

/** Deletes a tag by ID. */
export const deleteTag = async (tagId: string) => {
	return await db.tag.delete({ where: { id: tagId } });
};

/** Upserts a contact record by ID. */
export const upsertContact = async (
	contact: Prisma.ContactUncheckedCreateInput
) => {
	return await db.contact.upsert({
		where: { id: contact.id || v4() },
		update: contact,
		create: contact,
	});
};

/** Retrieves funnels (with funnel pages) for a subaccount. */
export const getFunnels = async (subacountId: string) => {
	return await db.funnel.findMany({
		where: { subAccountId: subacountId },
		include: { FunnelPages: true },
	});
};

/** Retrieves a funnel by ID, including ordered pages. */
export const getFunnel = async (funnelId: string) => {
	return await db.funnel.findUnique({
		where: { id: funnelId },
		include: {
			FunnelPages: {
				orderBy: { order: "asc" },
			},
		},
	});
};

/** Updates funnel products. */
export const updateFunnelProducts = async (
	products: string,
	funnelId: string
) => {
	return await db.funnel.update({
		where: { id: funnelId },
		data: { liveProducts: products },
	});
};

/** Creates or updates a funnel page, then revalidates the path. */
export const upsertFunnelPage = async (
	subaccountId: string,
	funnelPage: UpsertFunnelPage,
	funnelId: string
) => {
	if (!subaccountId || !funnelId) return;
	const response = await db.funnelPage.upsert({
		where: { id: funnelPage.id || "" },
		update: { ...funnelPage },
		create: {
			...funnelPage,
			content: funnelPage.content
				? funnelPage.content
				: JSON.stringify([
						{
							content: [],
							id: "__body",
							name: "Body",
							styles: { backgroundColor: "white" },
							type: "__body",
						},
					]),
			funnelId,
		},
	});

	revalidatePath(
		`/nexusconjure/subaccount/${subaccountId}/funnels/${funnelId}`,
		"page"
	);
	return response;
};

/** Deletes a funnel page by ID. */
export const deleteFunnelePage = async (funnelPageId: string) => {
	return await db.funnelPage.delete({
		where: { id: funnelPageId },
	});
};

/** Retrieves funnel page details by ID. */
export const getFunnelPageDetails = async (funnelPageId: string) => {
	return await db.funnelPage.findUnique({
		where: { id: funnelPageId },
	});
};

/** Retrieves domain content for subDomainName, including funnel pages. */
export const getDomainContent = async (subDomainName: string) => {
	return await db.funnel.findUnique({
		where: { subDomainName },
		include: { FunnelPages: true },
	});
};

/** Retrieves pipelines with lanes (and lane tickets) for a subaccount. */
export const getPipelines = async (subaccountId: string) => {
	return await db.pipeline.findMany({
		where: { subAccountId: subaccountId },
		include: {
			Lane: {
				include: { Tickets: true },
			},
		},
	});
};
