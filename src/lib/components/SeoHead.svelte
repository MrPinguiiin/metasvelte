<script lang="ts">
	/**
	 * SeoHead Component
	 * Komponen utama untuk render semua SEO meta tags
	 */
	import type { SeoConfig } from '../types.js';
	import { generateMetaTags, generateLinkTags, generateJsonLd } from '../utils.js';
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
	const jsonLdScript = $derived(currentConfig.jsonLd ? generateJsonLd(currentConfig.jsonLd) : null);

	const metaTagsHtml = $derived.by(() => {
		let html = '';

		if (title) {
			html += '<title>' + title + '</title>\n';
		}

		// Meta tags
		for (const tag of metaTags) {
			if (tag.name) {
				html += '<meta name="' + tag.name + '" content="' + tag.content + '">\n';
			} else if (tag.property) {
				html += '<meta property="' + tag.property + '" content="' + tag.content + '">\n';
			} else if (tag.httpEquiv) {
				html += '<meta http-equiv="' + tag.httpEquiv + '" content="' + tag.content + '">\n';
			}
		}

		// Link tags
		for (const link of linkTags) {
			let linkHtml = '<link rel="' + link.rel + '" href="' + link.href + '"';
			if (link.hreflang) linkHtml += ' hreflang="' + link.hreflang + '"';
			if (link.type) linkHtml += ' type="' + link.type + '"';
			if (link.sizes) linkHtml += ' sizes="' + link.sizes + '"';
			if (link.media) linkHtml += ' media="' + link.media + '"';
			linkHtml += '>\n';
			html += linkHtml;
		}

		// JSON-LD
		if (jsonLdScript) {
			html += '<script type="application/ld+json">' + jsonLdScript + '</scr' + 'ipt>\n';
		}

		return html;
	});
</script>

<svelte:head>
	{@html metaTagsHtml}
</svelte:head>
