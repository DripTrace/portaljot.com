// // // src/app/api/mockup/route.ts

// // import { NextRequest, NextResponse } from 'next/server';
// // import axios from 'axios';

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { variantId, imageUrl } = await request.json();

// //     const response = await axios.post(
// //       'https://api.printful.com/mockup-generator/create-task',
// //       {
// //         variant_ids: [variantId],
// //         format: 'jpg',
// //         files: [
// //           {
// //             placement: 'front',
// //             image_url: imageUrl,
// //             position: {
// //               area_width: 1800,
// //               area_height: 1800,
// //               width: 1800,
// //               height: 1800,
// //               top: 0,
// //               left: 0,
// //             },
// //           },
// //         ],
// //       },
// //       {
// //         headers: {
// //           'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
// //         },
// //       }
// //     );

// //     const taskKey = response.data.result.task_key;

// //     // Poll for mockup generation completion
// //     let mockupUrl: string | null = null;
// //     while (!mockupUrl) {
// //       await new Promise((resolve) => setTimeout(resolve, 1000));
// //       const taskResponse = await axios.get(
// //         `https://api.printful.com/mockup-generator/task?task_key=${taskKey}`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
// //           },
// //         }
// //       );

// //       if (taskResponse.data.result.status === 'completed') {
// //         mockupUrl = taskResponse.data.result.mockups[0].mockup_url;
// //       } else if (taskResponse.data.result.status === 'failed') {
// //         throw new Error('Mockup generation failed');
// //       }
// //     }

// //     return NextResponse.json({ mockupUrl });
// //   } catch (error) {
// //     console.error('Error generating mockup:', error);
// //     return NextResponse.json({ error: 'Failed to generate mockup' }, { status: 500 });
// //   }
// // }

// // import { NextRequest, NextResponse } from "next/server";
// // import axios from "axios";

// // export async function POST(request: NextRequest) {
// // 	try {
// // 		const { variantId, imageUrl } = await request.json();

// // 		const response = await axios.post(
// // 			"https://api.printful.com/mockup-generator/create-task",
// // 			{
// // 				variant_ids: [variantId],
// // 				format: "png",
// // 				files: [
// // 					{
// // 						placement: "front",
// // 						image_url: imageUrl,
// // 						position: {
// // 							area_width: 1800,
// // 							area_height: 1800,
// // 							width: 1800,
// // 							height: 1800,
// // 							top: 0,
// // 							left: 0,
// // 						},
// // 					},
// // 				],
// // 			},
// // 			{
// // 				headers: {
// // 					Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// // 				},
// // 			}
// // 		);

// // 		const taskKey = response.data.result.task_key;

// // 		let mockupUrl: string | null = null;
// // 		while (!mockupUrl) {
// // 			await new Promise((resolve) => setTimeout(resolve, 1000));
// // 			const taskResponse = await axios.get(
// // 				`https://api.printful.com/mockup-generator/task?task_key=${taskKey}`,
// // 				{
// // 					headers: {
// // 						Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// // 					},
// // 				}
// // 			);

// // 			if (taskResponse.data.result.status === "completed") {
// // 				mockupUrl = taskResponse.data.result.mockups[0].mockup_url;
// // 			} else if (taskResponse.data.result.status === "failed") {
// // 				throw new Error("Mockup generation failed");
// // 			}
// // 		}

// // 		return NextResponse.json({ mockupUrl });
// // 	} catch (error) {
// // 		console.error("Error generating mockup:", error);
// // 		return NextResponse.json(
// // 			{ error: "Failed to generate mockup" },
// // 			{ status: 500 }
// // 		);
// // 	}
// // }

// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(request: NextRequest) {
// 	try {
// 		const { variantId, imageUrl } = await request.json();

// 		if (!variantId) {
// 			throw new Error("Variant ID is required");
// 		}

// 		console.log("Creating mockup for variant:", { variantId, imageUrl });

// 		const response = await axios.post(
// 			"https://api.printful.com/mockup-generator/create-task",
// 			{
// 				variant_ids: [Number(variantId)], // Convert to number if it's a string
// 				format: "png",
// 				files: [
// 					{
// 						placement: "embroidery_front",
// 						image_url: imageUrl,
// 						position: {
// 							area_width: 1800,
// 							area_height: 1800,
// 							width: 1500,
// 							height: 1500,
// 							top: 150,
// 							left: 150,
// 						},
// 					},
// 				],
// 				options: {
// 					scaling: "fit",
// 					background: "white",
// 				},
// 			},
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// 				},
// 			}
// 		);

// 		if (!response.data?.result?.task_key) {
// 			throw new Error("No task key received from Printful");
// 		}

// 		const taskKey = response.data.result.task_key;
// 		console.log("Mockup task created:", taskKey);

// 		let attempts = 0;
// 		const maxAttempts = 10;
// 		let mockupUrl: string | null = null;

// 		while (!mockupUrl && attempts < maxAttempts) {
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			attempts++;

// 			const taskResponse = await axios.get(
// 				`https://api.printful.com/mockup-generator/task?task_key=${taskKey}`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// 					},
// 				}
// 			);

// 			console.log(
// 				`Mockup check attempt ${attempts}:`,
// 				taskResponse.data.result.status
// 			);

// 			if (taskResponse.data.result.status === "completed") {
// 				if (taskResponse.data.result.mockups?.[0]?.mockup_url) {
// 					mockupUrl = taskResponse.data.result.mockups[0].mockup_url;
// 					break;
// 				}
// 			} else if (taskResponse.data.result.status === "failed") {
// 				throw new Error(
// 					`Mockup generation failed: ${
// 						taskResponse.data.result.error || "Unknown error"
// 					}`
// 				);
// 			}
// 		}

// 		if (!mockupUrl) {
// 			throw new Error("Failed to generate mockup after maximum attempts");
// 		}

// 		console.log("Mockup generated successfully:", mockupUrl);
// 		return NextResponse.json({ mockupUrl });
// 	} catch (error) {
// 		console.error("Error generating mockup:", error);

// 		// More detailed error response
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		const errorResponse = {
// 			error: "Failed to generate mockup",
// 			details: errorMessage,
// 			technicalDetails:
// 				error instanceof Error && error.cause ? error.cause : undefined,
// 		};

// 		return NextResponse.json(errorResponse, { status: 500 });
// 	}
// }

// import { NextRequest, NextResponse } from "next/server";
// import axios, { AxiosResponse } from "axios";

// export async function POST(request: NextRequest) {
// 	try {
// 		const { variantId, imageUrl } = await request.json();

// 		console.log("Creating mockup for variant:", { variantId, imageUrl });

// 		// First, get the sync variant ID
// 		const syncResponse = await axios.get(
// 			`https://api.printful.com/store/products?limit=1`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// 				},
// 			}
// 		);

// 		if (!syncResponse.data?.result?.[0]?.sync_variant_id) {
// 			throw new Error("No sync variant ID found");
// 		}

// 		const syncVariantId = syncResponse.data.result[0].sync_variant_id;
// 		console.log("Found sync variant ID:", syncVariantId);

// 		// Now create the mockup with the sync variant ID
// 		const response = await axios.post(
// 			"https://api.printful.com/mockup-generator/create-task",
// 			{
// 				variant_ids: [syncVariantId],
// 				format: "png",
// 				files: [
// 					{
// 						placement: "embroidery_front",
// 						image_url: imageUrl,
// 						position: {
// 							area_width: 1800,
// 							area_height: 1800,
// 							width: 1500,
// 							height: 1500,
// 							top: 150,
// 							left: 150,
// 						},
// 					},
// 				],
// 				options: {
// 					scaling: "fit",
// 					background: "white",
// 				},
// 			},
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// 				},
// 			}
// 		);

// 		if (!response.data?.result?.task_key) {
// 			console.error("Printful response:", response.data);
// 			throw new Error("No task key received from Printful");
// 		}

// 		const taskKey = response.data.result.task_key;
// 		console.log("Mockup task created:", taskKey);

// 		let attempts = 0;
// 		const maxAttempts = 10;
// 		let mockupUrl: string | null = null;

// 		while (!mockupUrl && attempts < maxAttempts) {
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			attempts++;

// 			const taskResponse = await axios.get(
// 				`https://api.printful.com/mockup-generator/task?task_key=${taskKey}`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
// 					},
// 				}
// 			);

// 			console.log(
// 				`Mockup check attempt ${attempts}:`,
// 				taskResponse.data.result.status
// 			);

// 			if (taskResponse.data.result.status === "completed") {
// 				if (taskResponse.data.result.mockups?.[0]?.mockup_url) {
// 					mockupUrl = taskResponse.data.result.mockups[0].mockup_url;
// 					break;
// 				}
// 			} else if (taskResponse.data.result.status === "failed") {
// 				throw new Error(
// 					`Mockup generation failed: ${
// 						taskResponse.data.result.error || "Unknown error"
// 					}`
// 				);
// 			}
// 		}

// 		if (!mockupUrl) {
// 			throw new Error("Failed to generate mockup after maximum attempts");
// 		}

// 		console.log("Mockup generated successfully:", mockupUrl);
// 		return NextResponse.json({ mockupUrl });
// 	} catch (error) {
// 		console.error("Error generating mockup:", error);

// 		// More detailed error response including the actual Printful error if available
// 		const errorDetails =
// 			error instanceof Error ? error.message : "Unknown error";
// 		const response =
// 			error instanceof Error && "response" in error
// 				? (error as { response?: AxiosResponse }).response?.data
// 				: null; // Specify the type

// 		return NextResponse.json(
// 			{
// 				error: "Failed to generate mockup",
// 				details: errorDetails,
// 				printfulError: response,
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

// interface MockupTaskResult {
//     status: string;
//     failure_reasons?: string[];
//   }

//   interface PrintfulClient {
//     get: (url: string) => Promise<{ result: MockupTaskResult | string }>; // Allow for string or MockupTaskResult
// }

// // /app/api/mockup/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getPrintfulClient } from "@/lib/printful/printful-auth";
// import { prisma } from "@/lib/prisma";

// async function waitForMockupTask(client: PrintfulClient, taskId: number, maxAttempts = 10) {
//     let attempts = 0;
//     while (attempts < maxAttempts) {
//         const { result } = await client.get(`mockup-generator/tasks/${taskId}`);
//         if (typeof result === 'string') {
//             throw new Error(`Unexpected response: ${result}`);
//         }
//         if (result.status === "completed") {
//             return result;
//         } else if (result.status === "failed") {
//             throw new Error(`Mockup generation failed: ${JSON.stringify(result.failure_reasons)}`);
//         }
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         attempts++;
//     }
//     throw new Error("Mockup generation timed out");
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { variantId, imageUrl } = await req.json();

//     if (!variantId || !imageUrl) {
//       return NextResponse.json(
//         { error: "Missing required parameters" },
//         { status: 400 }
//       );
//     }

//     const variant = await prisma.hatVariant.findUnique({
//       where: { id: variantId },
//       include: { hatProduct: true }
//     });

//     if (!variant) {
//       return NextResponse.json(
//         { error: "Variant not found" },
//         { status: 404 }
//       );
//     }

//     const printfulClient = await getPrintfulClient();

//     // Create mockup generation task
//     const mockupTask = await printfulClient.post("mockup-generator/create-task", {
//       variant_ids: [variant.printfulFileId],
//       format: "jpg",
//       product: {
//         id: variant.hatProduct.printfulId,
//         variant_ids: [variant.printfulFileId],
//         placements: {
//           front: {
//             image_url: imageUrl,
//             position: {
//               area_width: 1800,
//               area_height: 1800,
//               width: 1500,
//               height: 1500,
//               top: 150,
//               left: 150
//             }
//           }
//         }
//       }
//     });

//     // Wait for mockup generation to complete
//     const mockupResult = await waitForMockupTask(printfulClient as PrintfulClient, mockupTask.task_id); // Cast if necessary
//     // Extract mockup URLs
//     const mockupUrls = mockupResult.mockups.map((mockup: any) => mockup.mockup_url);

//     // Update variant with mockup URLs
//     const updatedVariant = await prisma.hatVariant.update({
//       where: { id: variantId },
//       data: {
//         image: mockupUrls[0], // Use first mockup as primary image
//       }
//     });

//     // Update Stripe product with new images
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//     await stripe.products.update(
//       variant.stripePriceId.split('_')[0], // Extract product ID from price ID
//       {
//         images: mockupUrls
//       }
//     );

//     return NextResponse.json({
//       success: true,
//       variant: updatedVariant,
//       mockupUrls
//     });

//   } catch (error) {
//     console.error("Mockup generation error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to generate mockup",
//         details: error instanceof Error ? error.message : "Unknown error"
//       },
//       { status: 500 }
//     );
//   }
// }

export {};
