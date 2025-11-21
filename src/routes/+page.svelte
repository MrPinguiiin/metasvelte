<script lang="ts">
	import { SeoHead } from '$lib/index.js';

	// SEO config untuk homepage
	const homeSeo = {
		base: {
			title: 'Home - MetaSvelte',
			description: 'Selamat datang di MetaSvelte, library SEO terbaik untuk SvelteKit',
			canonical: 'https://yoursite.com/'
		},
		openGraph: {
			title: 'MetaSvelte - SEO Made Easy',
			description: 'Library powerful untuk manage SEO meta tags',
			url: 'https://yoursite.com/',
			image: 'https://yoursite.com/og-image.jpg'
		},
		twitter: {
			title: 'MetaSvelte - SEO Made Easy',
			description: 'Library powerful untuk manage SEO meta tags',
			image: 'https://yoursite.com/twitter-image.jpg'
		},
		jsonLd: {
			'@type': 'WebSite',
			name: 'MetaSvelte',
			url: 'https://yoursite.com',
			description: 'Library powerful untuk manage SEO meta tags'
		}
	};
</script>

<SeoHead config={homeSeo} />

<main>
	<h1>Welcome to MetaSvelte</h1>
	<p>SEO Library untuk SvelteKit yang powerful dan type-safe!</p>
</main>
