import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
	// Fetch product data dari API
	// Ini hanya contoh data
	const product = {
		id: params.id,
		name: 'Amazing Product',
		description: 'This is an amazing product that you will love',
		price: 99.99,
		images: ['https://mystore.com/images/product-1.jpg'],
		inStock: true,
		brand: 'Brand Name',
		rating: 4.5,
		reviewCount: 120
	};

	return {
		product
	};
};
