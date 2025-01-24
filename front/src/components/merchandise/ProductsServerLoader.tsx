// ProductsServerLoader.tsx
import { getProducts } from "@/actions/feature/merchandise/getProducts";
import ProductGrid from "./ProductIntegration/ProductGrid";

export default async function ProductsServerLoader() {
	const products = await getProducts();
	return <ProductGrid products={products} />;
}
