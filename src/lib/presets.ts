/**
 * SEO Presets
 * Pre-configured SEO templates untuk use cases umum
 */

import type { SeoConfig, RobotsConfig } from './types.js';

/**
 * Default SEO preset
 */
export const defaultSeoPreset: SeoConfig = {
	base: {
		viewport: 'width=device-width, initial-scale=1',
		charset: 'utf-8',
		robots: 'index, follow'
	}
};

/**
 * Blog preset
 */
export const blogPreset: Partial<SeoConfig> = {
	openGraph: {
		type: 'article'
	},
	twitter: {
		card: 'summary_large_image'
	}
};

/**
 * E-commerce preset
 */
export const ecommercePreset: Partial<SeoConfig> = {
	openGraph: {
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image'
	}
};

/**
 * Landing page preset
 */
export const landingPagePreset: Partial<SeoConfig> = {
	openGraph: {
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image'
	}
};

/**
 * No-index preset (untuk halaman yang tidak ingin diindex)
 */
export const noIndexPreset: Partial<SeoConfig> = {
	base: {
		robots: 'noindex, nofollow'
	}
};

/**
 * Robots config presets
 */
export const robotsPresets = {
	default: 'index, follow' as const,
	noIndex: 'noindex, follow' as const,
	noFollow: 'index, nofollow' as const,
	none: 'noindex, nofollow' as const,

	// Advanced configs
	restrictive: {
		index: false,
		follow: false,
		noarchive: true,
		nosnippet: true,
		noimageindex: true
	} as RobotsConfig,

	permissive: {
		index: true,
		follow: true,
		maxSnippet: -1,
		maxImagePreview: 'large',
		maxVideoPreview: -1
	} as RobotsConfig
};

/**
 * Social media presets
 */
export const socialPresets = {
	twitter: {
		summary: { card: 'summary' as const },
		summaryLargeImage: { card: 'summary_large_image' as const },
		app: { card: 'app' as const },
		player: { card: 'player' as const }
	},

	openGraph: {
		website: { type: 'website' as const },
		article: { type: 'article' as const },
		book: { type: 'book' as const },
		profile: { type: 'profile' as const }
	}
};
