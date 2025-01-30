import {
	generateUploadButton,
	generateUploadDropzone,
	generateUploader,
	generateReactHelpers,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/nexusconjure/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
	generateReactHelpers<OurFileRouter>();
