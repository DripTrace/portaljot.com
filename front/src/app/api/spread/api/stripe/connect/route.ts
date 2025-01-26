import { prisma as client } from "@/lib/client/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/modify/auth/route"; // Adjust the path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_SPREAD!, {
  typescript: true,
  apiVersion: "2024-12-18.acacia",
});

// Define TypeScript types for better type safety
type StripeAccount = Stripe.Account;
type StripePerson = Stripe.Person;
type StripeAccountLink = Stripe.AccountLink;

export async function GET() {
  try {
    // Retrieve the session using NextAuth
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse("User not authenticated", { status: 401 });
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      return new NextResponse("User email not found in session", { status: 400 });
    }

    // Check if the user already has a Stripe account
    const existingUser = await client.user.findUnique({
      where: { email: userEmail },
      select: { stripeId: true },
    });

    if (existingUser && existingUser.stripeId) {
      return new NextResponse("Stripe account already exists", { status: 400 });
    }

    // Create a new Stripe account
    const account: StripeAccount = await stripe.accounts.create({
      country: "US",
      type: "custom",
      business_type: "company",
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      external_account: "btok_us", // Consider removing or making dynamic
      tos_acceptance: {
				// date: 1547923073,
                date: Math.floor(Date.now() / 1000), // C
        urrent timestamp
        ip: "172.18.80.19", // Ideally, retrieve the user's IP dynamically
      },
    });

    // Update the Stripe account with additional information
    const approve: StripeAccount = await stripe.accounts.update(account.id, {
      business_profile: {
        mcc: "5045",
        url: "https://bestcookieco.com",
      },
      company: {
        address: {
          city: "Fairfax",
          line1: "123 State St",
          postal_code: "22031",
          state: "VA",
        },
        tax_id: "000000000", // Ensure this is securely handled
        name: "The Best Cookie Co",
        phone: "8888675309",
      },
    });

    // Create a representative person for the Stripe account
    const person: StripePerson = await stripe.accounts.createPerson(account.id, {
      first_name: "Jenny",
      last_name: "Rosen",
      relationship: {
        representative: true,
        title: "CEO",
      },
    });

    // Update the representative person's details
    const approvePerson: StripePerson = await stripe.accounts.updatePerson(
      account.id,
      person.id,
      {
        address: {
          city: "Victoria",
          line1: "123 State St",
          postal_code: "V8P 1A1",
          state: "BC",
        },
        dob: {
          day: 10,
          month: 11,
          year: 1980,
        },
        ssn_last_4: "0000",
        phone: "8888675309",
        email: "jenny@bestcookieco.com",
        relationship: {
          executive: true,
        },
      }
    );

    // Create an owner person for the Stripe account
    const owner: StripePerson = await stripe.accounts.createPerson(account.id, {
      first_name: "Kathleen",
      last_name: "Banks",
      email: "kathleen@bestcookieco.com",
      address: {
        city: "Victoria",
        line1: "123 State St",
        postal_code: "V8P 1A1",
        state: "BC",
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      phone: "8888675309",
      relationship: {
        owner: true,
        percent_ownership: 80,
      },
    });

    // Update the owner person's details
    const approveOwner: StripePerson = await stripe.accounts.updatePerson(
      account.id,
      owner.id,
      {
        address: {
          city: "Victoria",
          line1: "123 State St",
          postal_code: "V8P 1A1",
          state: "BC",
        },
        dob: {
          day: 10,
          month: 11,
          year: 1980,
        },
        ssn_last_4: "0000",
        phone: "8888675309",
        email: "kathleen@bestcookieco.com",
        relationship: {
          owner: true,
          percent_ownership: 80,
        },
      }
    );

    // Finalize the Stripe account setup
    const complete: StripeAccount = await stripe.accounts.update(account.id, {
      company: {
        owners_provided: true,
      },
    });

    // Save the Stripe account ID to your database
    const saveAccountId = await client.user.update({
      where: {
        email: userEmail, // Update based on your Prisma schema
      },
      data: {
        stripeId: account.id,
      },
    });

    if (!saveAccountId) {
      return new NextResponse("Failed to save Stripe account ID", { status: 500 });
    }

    // Create a Stripe account link for onboarding
    const accountLink: StripeAccountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.DOMAIN_URL_SPREAD}/callback/stripe/refresh`,
      return_url: `${process.env.DOMAIN_URL_SPREAD}/callback/stripe/success`,
      type: "account_onboarding",
      collection_options: {
        fields: ["currently_due"], // Updated to array syntax
      },
    });

    // Respond with the Stripe account link URL
    return NextResponse.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
