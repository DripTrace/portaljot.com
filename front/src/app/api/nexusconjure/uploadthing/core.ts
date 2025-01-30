// src/app/api/nexusconjure/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/client/prisma";
import { UserMetadata } from "@/utils/nexusconjure/types";

const f = createUploadthing();

const authenticateUser = async (context: {
	req: NextRequest;
}): Promise<UserMetadata> => {
	const { req } = context;

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!token) {
		throw new Error("Unauthorized");
	}

	const userMetadata: UserMetadata = {
		userId: token.sub || "",
		email: token.email || null,
		role: (token.role as Role) || Role,
		subAccountId:
			typeof token.subAccountId === "string" ? token.subAccountId : null,
		agencyId: typeof token.agencyId === "string" ? token.agencyId : null,
	};

	return userMetadata;
};

export const ourFileRouter = {
	subaccountLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(async ({ metadata, file }) => {
			if (metadata && metadata.subAccountId) {
				await prisma.subAccount.update({
					where: { id: metadata.subAccountId },
					data: { logoUrl: file.url },
				});
			}
		}),

	avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(async ({ metadata, file }) => {
			if (metadata && metadata.userId) {
				await prisma.user.update({
					where: { id: metadata.userId },
					data: { avatarUrl: file.url },
				});
			}
		}),

	agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(async ({ metadata, file }) => {
			if (metadata && metadata.agencyId) {
				await prisma.agency.update({
					where: { id: metadata.agencyId },
					data: { logoUrl: file.url },
				});
			}
		}),

	media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(async ({ metadata, file }) => {
			if (metadata) {
				await prisma.media.create({
					data: {
						url: file.url,
						name: file.name || "Unnamed Media",
						userId: metadata.userId,
						agencyId: metadata.agencyId,
						subAccountId: metadata.subAccountId || undefined,
					},
				});
			}
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
