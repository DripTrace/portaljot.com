// // lib/client/prisma.ts

// import { PrismaClient } from "@prisma/client";

// declare global {
// 	// Allow global `var` declarations
// 	// eslint-disable-next-line no-var
// 	var prisma: PrismaClient | undefined;
// }

// export const prisma =
// 	global.prisma ||
// 	new PrismaClient({
// 		log: ["query"],
// 	});

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// lib/client/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
	// Allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["query", "info", "warn", "error"],
	});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };
