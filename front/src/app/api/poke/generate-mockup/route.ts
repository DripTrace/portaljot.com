// import { NextRequest, NextResponse } from "next/server";
// import { getPrintfulClient } from "@/lib/poke/printful/printful-auth";
// import { prisma } from "@/lib/client/prisma";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_POKE!, {
//   apiVersion: "2024-12-18.acacia",
// });

// async function waitForMockupTask(client: any, taskId: number, maxAttempts = 10) {
//   let attempts = 0;
//   while (attempts < maxAttempts) {
//     const { result } = await client.get(`mockup-generator/task/${taskId}`);

//     if (result.status === "completed") {
//       return result;
//     } else if (result.status === "failed") {
//       throw new Error(`Mockup generation failed: ${JSON.stringify(result.failure_reasons)}`);
//     }

//     await new Promise(resolve => setTimeout(resolve, 2000));
//     attempts++;
//   }
//   throw new Error("Mockup generation timed out");
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
//       include: {
//         hatProduct: true
//       }
//     });

//     if (!variant) {
//       return NextResponse.json(
//         { error: "Variant not found" },
//         { status: 404 }
//       );
//     }

//     const printfulClient = await getPrintfulClient();

//     const mockupTask = await printfulClient.post("mockup-generator/create-task", {
//       variant_ids: [variant.printfulFileId],
//       format: "jpg",
//       product: {
//         id: 91,
//         variant_ids: [variant.printfulFileId],
//         options: [
//           {
//             id: "embroidery_type",
//             value: variant.selectedOptions.embroidery_type
//           },
//           {
//             id: "thread_colors",
//             value: variant.selectedOptions.thread_colors
//           }
//         ],
//         placements: {
//           embroidery_front: {
//             artwork_url: imageUrl,
//             options: {
//               thread_colors: variant.selectedOptions.thread_colors,
//               embroidery_type: variant.selectedOptions.embroidery_type
//             },
//             dimensions: {
//               width: 4.0,
//               height: 2.25
//             },
//             position: {
//               x: 2.5,
//               y: 2.0
//             }
//           }
//         }
//       },
//       mockup_style_ids: [1115, 931, 849]
//     });

//     const mockupResult = await waitForMockupTask(printfulClient, mockupTask.result.task_id);
//     const mockupUrls = mockupResult.mockups.map((mockup: any) => mockup.mockup_url);

//     const updatedVariant = await prisma.hatVariant.update({
//       where: { id: variantId },
//       data: {
//         image: mockupUrls[0]
//       }
//     });

//     await stripe.products.update(
//       updatedVariant.stripePriceId.split('_')[0],
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

//     let errorMessage = "Failed to generate mockup";
//     let errorDetails = error instanceof Error ? error.message : "Unknown error";
//     let statusCode = 500;

//     if (error instanceof Error) {
//       if (error.message.includes("task_id")) {
//         errorMessage = "Invalid mockup task ID";
//         statusCode = 400;
//       } else if (error.message.includes("timed out")) {
//         errorMessage = "Mockup generation timed out";
//         statusCode = 504;
//       }
//     }

//     return NextResponse.json(
//       {
//         error: errorMessage,
//         details: errorDetails
//       },
//       { status: statusCode }
//     );
//   }
// }

export {};
