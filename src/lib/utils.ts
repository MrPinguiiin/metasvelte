/**
 * Utility functions untuk SEO meta generation
 */

import type { SeoConfig, RobotsConfig, MetaTag, LinkTag, JsonLdSchema } from './types.js';

/**
 * Deep merge dua objects
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
	const result = { ...target };

	for (const key in source) {
		const sourceValue = source[key];
		const targetValue = result[key];

		if (sourceValue === undefined) continue;

		if (isObject(sourceValue) && isObject(targetValue)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			result[key] = deepMerge(targetValue as any, sourceValue as any) as T[Extract<keyof T, string>];
		} else {
			result[key] = sourceValue as T[Extract<keyof T, string>];
		}
	}

	return result;
}

function isObject(item: unknown): item is Record<string, unknown> {
	return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Convert robots config ke string
 */
export function robotsToString(robots: string | RobotsConfig): string {
	if (typeof robots === 'string') return robots;

	const parts: string[] = [];

	if (robots.index === false) parts.push('noindex');
	if (robots.follow === false) parts.push('nofollow');
	if (robots.noarchive) parts.push('noarchive');
	if (robots.nosnippet) parts.push('nosnippet');
	if (robots.noimageindex) parts.push('noimageindex');
	if (robots.maxSnippet !== undefined) parts.push(`max-snippet:${robots.maxSnippet}`);
	if (robots.maxImagePreview) parts.push(`max-image-preview:${robots.maxImagePreview}`);
	if (robots.maxVideoPreview !== undefined)
		parts.push(`max-video-preview:${robots.maxVideoPreview}`);

	return parts.join(', ') || 'index, follow';
}

/**
 * Normalize keywords ke string
 */
export function keywordsToString(keywords: string | string[]): string {
	return Array.isArray(keywords) ? keywords.join(', ') : keywords;
}

/**
 * Generate meta tags dari config
 */
export function generateMetaTags(config: SeoConfig): MetaTag[] {
	const tags: MetaTag[] = [];

	// Base meta tags
	if (config.base) {
		const { description, keywords, author, robots, viewport, charset, language, themeColor } =
			config.base;

		if (description) tags.push({ name: 'description', content: description });
		if (keywords) tags.push({ name: 'keywords', content: keywordsToString(keywords) });
		if (author) tags.push({ name: 'author', content: author });
		if (robots) tags.push({ name: 'robots', content: robotsToString(robots) });
		if (viewport) tags.push({ name: 'viewport', content: viewport });
		if (charset) tags.push({ name: 'charset', content: charset });
		if (language) tags.push({ httpEquiv: 'content-language', content: language });
		if (themeColor) tags.push({ name: 'theme-color', content: themeColor });
	}

	// Open Graph tags
	if (config.openGraph) {
		const og = config.openGraph;

		if (og.title) tags.push({ property: 'og:title', content: og.title });
		if (og.description) tags.push({ property: 'og:description', content: og.description });
		if (og.type) tags.push({ property: 'og:type', content: og.type });
		if (og.url) tags.push({ property: 'og:url', content: og.url });
		if (og.siteName) tags.push({ property: 'og:site_name', content: og.siteName });
		if (og.locale) tags.push({ property: 'og:locale', content: og.locale });
		if (og.determiner) tags.push({ property: 'og:determiner', content: og.determiner });

		// OG Images
		if (og.image) {
			const images = Array.isArray(og.image) ? og.image : [og.image];
			images.forEach((img) => {
				if (typeof img === 'string') {
					tags.push({ property: 'og:image', content: img });
				} else {
					tags.push({ property: 'og:image', content: img.url });
					if (img.secureUrl) tags.push({ property: 'og:image:secure_url', content: img.secureUrl });
					if (img.type) tags.push({ property: 'og:image:type', content: img.type });
					if (img.width) tags.push({ property: 'og:image:width', content: String(img.width) });
					if (img.height) tags.push({ property: 'og:image:height', content: String(img.height) });
					if (img.alt) tags.push({ property: 'og:image:alt', content: img.alt });
				}
			});
		}

		// OG Locale Alternates
		if (og.localeAlternate) {
			og.localeAlternate.forEach((locale) => {
				tags.push({ property: 'og:locale:alternate', content: locale });
			});
		}

		// OG Audio
		if (og.audio) {
			const audios = Array.isArray(og.audio) ? og.audio : [og.audio];
			audios.forEach((audio) => {
				if (typeof audio === 'string') {
					tags.push({ property: 'og:audio', content: audio });
				} else {
					tags.push({ property: 'og:audio', content: audio.url });
					if (audio.secureUrl)
						tags.push({ property: 'og:audio:secure_url', content: audio.secureUrl });
					if (audio.type) tags.push({ property: 'og:audio:type', content: audio.type });
				}
			});
		}

		// OG Video
		if (og.video) {
			const videos = Array.isArray(og.video) ? og.video : [og.video];
			videos.forEach((video) => {
				if (typeof video === 'string') {
					tags.push({ property: 'og:video', content: video });
				} else {
					tags.push({ property: 'og:video', content: video.url });
					if (video.secureUrl)
						tags.push({ property: 'og:video:secure_url', content: video.secureUrl });
					if (video.type) tags.push({ property: 'og:video:type', content: video.type });
					if (video.width) tags.push({ property: 'og:video:width', content: String(video.width) });
					if (video.height)
						tags.push({ property: 'og:video:height', content: String(video.height) });
				}
			});
		}
	}

	// Article tags
	if (config.article) {
		const article = config.article;

		if (article.publishedTime)
			tags.push({ property: 'article:published_time', content: article.publishedTime });
		if (article.modifiedTime)
			tags.push({ property: 'article:modified_time', content: article.modifiedTime });
		if (article.expirationTime)
			tags.push({ property: 'article:expiration_time', content: article.expirationTime });
		if (article.section) tags.push({ property: 'article:section', content: article.section });

		if (article.author) {
			const authors = Array.isArray(article.author) ? article.author : [article.author];
			authors.forEach((author) => tags.push({ property: 'article:author', content: author }));
		}

		if (article.tag) {
			const articleTags = Array.isArray(article.tag) ? article.tag : [article.tag];
			articleTags.forEach((tag) => tags.push({ property: 'article:tag', content: tag }));
		}
	}

	// Twitter tags
	if (config.twitter) {
		const tw = config.twitter;

		if (tw.card) tags.push({ name: 'twitter:card', content: tw.card });
		if (tw.site) tags.push({ name: 'twitter:site', content: tw.site });
		if (tw.siteId) tags.push({ name: 'twitter:site:id', content: tw.siteId });
		if (tw.creator) tags.push({ name: 'twitter:creator', content: tw.creator });
		if (tw.creatorId) tags.push({ name: 'twitter:creator:id', content: tw.creatorId });
		if (tw.title) tags.push({ name: 'twitter:title', content: tw.title });
		if (tw.description) tags.push({ name: 'twitter:description', content: tw.description });

		if (tw.image) {
			if (typeof tw.image === 'string') {
				tags.push({ name: 'twitter:image', content: tw.image });
			} else {
				tags.push({ name: 'twitter:image', content: tw.image.url });
				if (tw.image.alt) tags.push({ name: 'twitter:image:alt', content: tw.image.alt });
			}
		}

		if (tw.imageAlt) tags.push({ name: 'twitter:image:alt', content: tw.imageAlt });
		if (tw.player) tags.push({ name: 'twitter:player', content: tw.player });
		if (tw.playerWidth)
			tags.push({ name: 'twitter:player:width', content: String(tw.playerWidth) });
		if (tw.playerHeight)
			tags.push({ name: 'twitter:player:height', content: String(tw.playerHeight) });
		if (tw.playerStream) tags.push({ name: 'twitter:player:stream', content: tw.playerStream });

		// Twitter App
		if (tw.app) {
			if (tw.app.name?.iphone)
				tags.push({ name: 'twitter:app:name:iphone', content: tw.app.name.iphone });
			if (tw.app.name?.ipad)
				tags.push({ name: 'twitter:app:name:ipad', content: tw.app.name.ipad });
			if (tw.app.name?.googleplay)
				tags.push({ name: 'twitter:app:name:googleplay', content: tw.app.name.googleplay });
			if (tw.app.id?.iphone)
				tags.push({ name: 'twitter:app:id:iphone', content: tw.app.id.iphone });
			if (tw.app.id?.ipad) tags.push({ name: 'twitter:app:id:ipad', content: tw.app.id.ipad });
			if (tw.app.id?.googleplay)
				tags.push({ name: 'twitter:app:id:googleplay', content: tw.app.id.googleplay });
			if (tw.app.url?.iphone)
				tags.push({ name: 'twitter:app:url:iphone', content: tw.app.url.iphone });
			if (tw.app.url?.ipad) tags.push({ name: 'twitter:app:url:ipad', content: tw.app.url.ipad });
			if (tw.app.url?.googleplay)
				tags.push({ name: 'twitter:app:url:googleplay', content: tw.app.url.googleplay });
		}
	}

	// Facebook tags
	if (config.facebook) {
		const fb = config.facebook;

		if (fb.appId) tags.push({ property: 'fb:app_id', content: fb.appId });
		if (fb.pages) tags.push({ property: 'fb:pages', content: fb.pages });

		if (fb.admins) {
			const admins = Array.isArray(fb.admins) ? fb.admins : [fb.admins];
			admins.forEach((admin) => tags.push({ property: 'fb:admins', content: admin }));
		}
	}

	// Additional meta tags
	if (config.additionalMetaTags) {
		tags.push(...config.additionalMetaTags);
	}

	return tags;
}

/**
 * Generate link tags dari config
 */
export function generateLinkTags(config: SeoConfig): LinkTag[] {
	const links: LinkTag[] = [];

	// Canonical URL
	if (config.base?.canonical) {
		links.push({ rel: 'canonical', href: config.base.canonical });
	}

	// Additional link tags
	if (config.additionalLinkTags) {
		links.push(...config.additionalLinkTags);
	}

	return links;
}

/**
 * Generate JSON-LD script content
 */
export function generateJsonLd(schemas: JsonLdSchema | JsonLdSchema[]): string {
	const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

	const enrichedSchemas = schemaArray.map((schema) => ({
		'@context': 'https://schema.org',
		...schema
	}));

	return JSON.stringify(enrichedSchemas.length === 1 ? enrichedSchemas[0] : enrichedSchemas);
}

/**
 * Sanitize string untuk HTML attributes
 */
export function sanitizeAttribute(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
