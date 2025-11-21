<script lang="ts">
	import { SeoHead, createProductSeo } from '$lib/index.js';

	interface PageData {
		product: {
			id: string;
			name: string;
			description: string;
			price: number;
			images: string[];
			inStock: boolean;
			brand: string;
			rating: number;
			reviewCount: number;
		};
	}

	let { data }: { data: PageData } = $props();

	const seo = $derived(
		createProductSeo({
			name: data.product.name,
			description: data.product.description,
			url: `https://mystore.com/products/${data.product.id}`,
			image: data.product.images,
			price: data.product.price.toString(),
			currency: 'USD',
			availability: data.product.inStock ? 'InStock' : 'OutOfStock',
			brand: data.product.brand,
			rating: data.product.rating
				? {
						value: data.product.rating,
						count: data.product.reviewCount
					}
				: undefined
		})
	);
</script>

<SeoHead config={seo} />

<div class="product">
	<h1>{data.product.name}</h1>
	<p>{data.product.description}</p>
	<p class="price">${data.product.price}</p>
	<p class="stock">{data.product.inStock ? 'In Stock' : 'Out of Stock'}</p>
</div>
