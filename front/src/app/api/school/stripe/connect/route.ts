import { onAuthenticatedUser } from "@/actions/auth";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const groupid = searchParams.get("groupid");

    // Log the groupid to verify it's being received correctly
    console.log("Received groupid:", groupid);

    if (!groupid) {
      return NextResponse.json(
        { error: "Group ID is required" },
        { status: 400 },
      );
    }

    const account = await stripe.accounts.create({
      type: "standard",
      country: "US",
      business_type: "individual",
    });

    if (account) {
      console.log("THE ACCOUNT[CONNECT/ROUTE]: ", account);
      const user = await onAuthenticatedUser();
      if (!user) {
        throw new Error("User authentication failed");
      }
      const integrateStripeAccount = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeId: account.id,
        },
      });

      if (integrateStripeAccount) {
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${process.env.DOMAIN_URL}/callback/stripe/refresh`,
          return_url: `${process.env.DOMAIN_URL}/group/${groupid}/settings/integrations`,
          //   refresh_url: `http://localhost:3000/callback/stripe/refresh`,
          //   return_url: `http://localhost:3000/group/${groupid}/settings/integrations`,
          type: "account_onboarding",
        });
        console.log(accountLink);
        return NextResponse.json({
          url: accountLink.url,
        });
      }
    }
  } catch (error) {
    console.error("Error creating Stripe account:", error);
    return new NextResponse(
      "An error occurred when calling the Stripe API to create an account:",
      { status: 500 },
    );
  }
}
