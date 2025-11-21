<script lang="ts">
	/**
	 * SeoHead Component
	 * Komponen utama untuk render semua SEO meta tags
	 */
	import type { SeoConfig } from '../types.js';
	import { 
		generateMetaTags, 
		generateLinkTags, 
		generateJsonLd,
		sanitizeAttribute 
	} from '../utils.js';
	import { seoStore } from '../seo-store.svelte.js';

	interface Props {
		config?: Partial<SeoConfig>;
		merge?: boolean;
	}

	let { config = {}, merge = false }: Props = $props();

	// Update store ketika config berubah
	$effect(() => {
		if (Object.keys(config).length > 0) {
			if (merge) {
				seoStore.merge(config);
			} else {
				seoStore.update(config);
			}
		}
	});

	// Reactive values
	const currentConfig = $derived(seoStore.config);
	const metaTags = $derived(generateMetaTags(currentConfig));
	const linkTags = $derived(generateLinkTags(currentConfig));
	const title = $derived(currentConfig.base?.title || '');
	const jsonLdScript = $derived(
		currentConfig.jsonLd ? generateJsonLd(currentConfig.jsonLd) : null
	);
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}

	{#each metaTags as tag}
		{#if tag.name}
			<meta name={sanitizeAttribute(tag.name)} content={sanitizeAttribute(tag.content)} />
		{:else if tag.property}
			<meta property={sanitizeAttribute(tag.property)} content={sanitizeAttribute(tag.content)} />
		{:else if tag.httpEquiv}
			<meta http-equiv={sanitizeAttribute(tag.httpEquiv)} content={sanitizeAttribute(tag.content)} />
		{/if}
	{/each}

	{#each linkTags as link}
		<link 
			rel={link.rel} 
			href={link.href}
			{...(link.hreflang && { hreflang: link.hreflang })}
			{...(link.type && { type: link.type })}
			{...(link.sizes && { sizes: link.sizes })}
			{...(link.media && { media: link.media })}
		/>
	{/each}

	{#if jsonLdScript}
		{@html `<script type="application/ld+json">${jsonLdScript}</script>`}
	{/if}
</svelte:head>
