import type { Product } from '../data/products';

/** Simple "you may also like" list for a product page: same subcategory
 *  first, then same category, excluding the product itself and anything
 *  out of stock. */
export function getRelatedProducts(product: Product, allProducts: Product[], limit = 4): Product[] {
	const inStock = allProducts.filter((p) => p.slug !== product.slug && p.stockStatus !== 'out_of_stock');

	const bySub = product.subcategory ? inStock.filter((p) => p.subcategory === product.subcategory) : [];
	const byCategory = inStock.filter((p) => p.category === product.category);

	const seen = new Set<string>();
	const related: Product[] = [];
	for (const p of [...bySub, ...byCategory]) {
		if (seen.has(p.slug)) continue;
		seen.add(p.slug);
		related.push(p);
		if (related.length >= limit) break;
	}

	return related;
}
