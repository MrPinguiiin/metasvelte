import { renderSeoTags } from '$lib/server/index.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	// Render SEO tags di server-side (tanpa hydration markers)
	const seoHtml = renderSeoTags({
		base: {
			title: 'Server-Side SEO Example - MetaSvelte',
			description: 'Contoh render SEO tags di server-side tanpa hydration markers',
			keywords: ['server-side', 'seo', 'clean html']
		},
		openGraph: {
			type: 'website',
			title: 'Server-Side SEO Example',
			description: 'HTML yang super clean tanpa komentar Svelte',
			url: 'https://yoursite.com/server-example',
			image: 'https://via.placeholder.com/1200x630'
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Server-Side SEO Example',
			description: 'HTML yang super clean tanpa komentar Svelte'
		}
	});

	return {
		seoHtml
	};
};
