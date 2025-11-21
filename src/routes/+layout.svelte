<script lang="ts">
	import { seoStore, createSeoConfig } from '$lib/index.js';

	// Set default SEO config untuk seluruh aplikasi
	const defaultSeo = createSeoConfig({
		base: {
			title: 'MetaSvelte - SEO Library untuk SvelteKit',
			description: 'Library powerful untuk manage SEO meta tags di SvelteKit',
			keywords: ['sveltekit', 'seo', 'meta tags', 'open graph'],
			author: 'Your Name',
			themeColor: '#ff3e00'
		},
		openGraph: {
			type: 'website',
			siteName: 'MetaSvelte',
			locale: 'id_ID'
		},
		twitter: {
			card: 'summary_large_image',
			site: '@yourhandle'
		},
		facebook: {
			appId: 'your-fb-app-id'
		}
	});

	// Set default config di store (tidak perlu render SeoHead di sini)
	seoStore.setDefault(defaultSeo);

	let { children } = $props();
</script>

{@render children()}
