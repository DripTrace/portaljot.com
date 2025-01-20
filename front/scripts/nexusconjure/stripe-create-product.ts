import * as dotenv from "dotenv";
import Stripe from "stripe";

// Load environment variables
dotenv.config();

// Ensure the API key is present
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key not found in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20", // Use the latest or required API version
});

interface ProductData {
    name: string;
    description: string;
    features: string;
}

interface PriceData {
    amount: number;
    interval: "month" | "year";
}

async function createProduct(productData: ProductData) {
    try {
        const product = await stripe.products.create({
            name: productData.name,
            description: productData.description,
            metadata: {
                features: productData.features,
            },
        });
        console.log(`Product created: ${product.id}`);
        return product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

async function createPrice(productId: string, priceData: PriceData) {
    try {
        const price = await stripe.prices.create({
            product: productId,
            unit_amount: priceData.amount,
            currency: "usd",
            recurring: { interval: priceData.interval },
        });
        console.log(`Price created: ${price.id}`);
        return price;
    } catch (error) {
        console.error("Error creating price:", error);
        throw error;
    }
}

async function createProductWithPrices(
    productData: ProductData,
    prices: PriceData[]
) {
    const product = await createProduct(productData);
    const createdPrices = await Promise.all(
        prices.map((price) => createPrice(product.id, price))
    );
    return { product, prices: createdPrices };
}

export const createStripeProductWithPrices = createProductWithPrices;
