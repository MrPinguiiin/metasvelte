<script lang="ts">
	import { SeoHead } from '$lib/index.js';

	const blogSeo = {
		base: {
			title: 'Blog - MetaSvelte',
			description: 'Artikel dan tutorial tentang SEO di SvelteKit',
			canonical: 'https://yoursite.com/blog'
		},
		openGraph: {
			type: 'website' as const,
			title: 'Blog - MetaSvelte',
			url: 'https://yoursite.com/blog'
		}
	};
</script>

<SeoHead config={blogSeo} />

<main>
	<h1>Blog</h1>
	<p>Daftar artikel blog...</p>
</main>
