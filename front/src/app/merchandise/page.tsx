import { getProducts } from "@/actions/feature/merchandise/getProducts";
import Merchandise from "@/components/merchandise/Merchandise";

export default async function MerchandisePage() {
	const products = await getProducts();

	return <Merchandise products={products} />;
}
