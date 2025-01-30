// src/app/api/nexusconjure/uploadthing/route.ts

import { ourFileRouter } from "./core";
import { createRouteHandler } from "uploadthing/next";

export const GET = createRouteHandler({ router: ourFileRouter });
export const POST = createRouteHandler({ router: ourFileRouter });
