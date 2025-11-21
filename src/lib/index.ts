/**
 * MetaSvelte - SEO Meta Management Library untuk SvelteKit
 *
 * @packageDocumentation
 */

// Core exports
export { default as SeoHead } from './components/SeoHead.svelte';
export { seoStore } from './seo-store.svelte.js';

// Types
export type {
	SeoConfig,
	BaseMeta,
	OpenGraphMeta,
	OpenGraphImage,
	OpenGraphArticle,
	TwitterMeta,
	TwitterImage,
	TwitterApp,
	FacebookMeta,
	LinkedInMeta,
	JsonLdSchema,
	MetaTag,
	LinkTag,
	RobotsConfig,
	RouteSeoConfig,
	SeoContext,
	SchemaType
} from './types.js';

// Helpers
export {
	createBaseSeo,
	createOpenGraph,
	createTwitterCard,
	createFacebook,
	createArticle,
	createJsonLd,
	createSeoConfig,
	createArticleSeo,
	createProductSeo,
	createOrganizationSeo,
	mergeSeoConfigs
} from './helpers.js';

// Utilities
export {
	deepMerge,
	robotsToString,
	keywordsToString,
	generateMetaTags,
	generateLinkTags,
	generateJsonLd,
	sanitizeAttribute
} from './utils.js';

// Hooks
export { createSeoHandle, getCanonicalUrl, getOgImageUrl } from './hooks.js';

// Presets
export {
	defaultSeoPreset,
	blogPreset,
	ecommercePreset,
	landingPagePreset,
	noIndexPreset,
	robotsPresets,
	socialPresets
} from './presets.js';

// Type augmentation (import this to extend App.Locals)
import './app.d.ts';
