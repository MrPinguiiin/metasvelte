import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
	// Fetch article data dari API atau database
	// Ini hanya contoh data
	const article = {
		slug: params.slug,
		title: 'Cara Menggunakan MetaSvelte',
		excerpt: 'Panduan lengkap menggunakan MetaSvelte untuk SEO di SvelteKit',
		content: 'Konten artikel lengkap...',
		coverImage: 'https://yoursite.com/images/article-cover.jpg',
		author: 'John Doe',
		publishedAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-01-20T15:30:00Z',
		category: 'Tutorial',
		tags: ['sveltekit', 'seo', 'tutorial']
	};

	return {
		article
	};
};
