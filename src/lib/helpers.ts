/**
 * Helper functions untuk membuat SEO config dengan mudah
 */

import type {
	SeoConfig,
	OpenGraphMeta,
	TwitterMeta,
	FacebookMeta,
	OpenGraphArticle,
	JsonLdSchema,
	BaseMeta
} from './types.js';

/**
 * Create base SEO config
 */
export function createBaseSeo(config: BaseMeta): Pick<SeoConfig, 'base'> {
	return { base: config };
}

/**
 * Create Open Graph config
 */
export function createOpenGraph(config: OpenGraphMeta): Pick<SeoConfig, 'openGraph'> {
	return { openGraph: config };
}

/**
 * Create Twitter Card config
 */
export function createTwitterCard(config: TwitterMeta): Pick<SeoConfig, 'twitter'> {
	return { twitter: config };
}

/**
 * Create Facebook config
 */
export function createFacebook(config: FacebookMeta): Pick<SeoConfig, 'facebook'> {
	return { facebook: config };
}

/**
 * Create Article config
 */
export function createArticle(config: OpenGraphArticle): Pick<SeoConfig, 'article'> {
	return { article: config };
}

/**
 * Create JSON-LD Schema
 */
export function createJsonLd(schema: JsonLdSchema | JsonLdSchema[]): Pick<SeoConfig, 'jsonLd'> {
	return { jsonLd: schema };
}

/**
 * Create complete SEO config dengan defaults yang smart
 */
export function createSeoConfig(config: Partial<SeoConfig>): SeoConfig {
	const defaults: SeoConfig = {
		base: {
			viewport: 'width=device-width, initial-scale=1',
			charset: 'utf-8',
			robots: 'index, follow'
		}
	};

	return {
		...defaults,
		...config,
		base: {
			...defaults.base,
			...config.base
		}
	};
}

/**
 * Create SEO config untuk halaman artikel/blog
 */
export function createArticleSeo(options: {
	title: string;
	description: string;
	url: string;
	image: string;
	author: string;
	publishedTime: string;
	modifiedTime?: string;
	section?: string;
	tags?: string[];
	siteName?: string;
	twitterHandle?: string;
}): SeoConfig {
	return createSeoConfig({
		base: {
			title: options.title,
			description: options.description,
			canonical: options.url
		},
		openGraph: {
			type: 'article',
			title: options.title,
			description: options.description,
			url: options.url,
			image: options.image,
			siteName: options.siteName
		},
		article: {
			publishedTime: options.publishedTime,
			modifiedTime: options.modifiedTime,
			author: options.author,
			section: options.section,
			tag: options.tags
		},
		twitter: {
			card: 'summary_large_image',
			title: options.title,
			description: options.description,
			image: options.image,
			creator: options.twitterHandle
		},
		jsonLd: {
			'@type': 'Article',
			headline: options.title,
			description: options.description,
			image: options.image,
			author: {
				'@type': 'Person',
				name: options.author
			},
			datePublished: options.publishedTime,
			dateModified: options.modifiedTime || options.publishedTime
		}
	});
}

/**
 * Create SEO config untuk halaman produk
 */
export function createProductSeo(options: {
	name: string;
	description: string;
	url: string;
	image: string | string[];
	price: string;
	currency: string;
	availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
	brand?: string;
	rating?: {
		value: number;
		count: number;
	};
}): SeoConfig {
	const images = Array.isArray(options.image) ? options.image : [options.image];

	return createSeoConfig({
		base: {
			title: options.name,
			description: options.description,
			canonical: options.url
		},
		openGraph: {
			type: 'website',
			title: options.name,
			description: options.description,
			url: options.url,
			image: images[0]
		},
		twitter: {
			card: 'summary_large_image',
			title: options.name,
			description: options.description,
			image: images[0]
		},
		jsonLd: {
			'@type': 'Product',
			name: options.name,
			description: options.description,
			image: images,
			brand: options.brand ? {
				'@type': 'Brand',
				name: options.brand
			} : undefined,
			offers: {
				'@type': 'Offer',
				price: options.price,
				priceCurrency: options.currency,
				availability: `https://schema.org/${options.availability || 'InStock'}`
			},
			aggregateRating: options.rating ? {
				'@type': 'AggregateRating',
				ratingValue: options.rating.value,
				reviewCount: options.rating.count
			} : undefined
		}
	});
}

/**
 * Create SEO config untuk organization/website
 */
export function createOrganizationSeo(options: {
	name: string;
	description: string;
	url: string;
	logo: string;
	socialProfiles?: string[];
	contactPoint?: {
		telephone: string;
		contactType: string;
	};
}): SeoConfig {
	return createSeoConfig({
		base: {
			title: options.name,
			description: options.description,
			canonical: options.url
		},
		openGraph: {
			type: 'website',
			title: options.name,
			description: options.description,
			url: options.url,
			image: options.logo
		},
		twitter: {
			card: 'summary',
			title: options.name,
			description: options.description,
			image: options.logo
		},
		jsonLd: [
			{
				'@type': 'Organization',
				name: options.name,
				url: options.url,
				logo: options.logo,
				sameAs: options.socialProfiles,
				contactPoint: options.contactPoint ? {
					'@type': 'ContactPoint',
					telephone: options.contactPoint.telephone,
					contactType: options.contactPoint.contactType
				} : undefined
			},
			{
				'@type': 'WebSite',
				name: options.name,
				url: options.url
			}
		]
	});
}

/**
 * Merge multiple SEO configs
 */
export function mergeSeoConfigs(...configs: Partial<SeoConfig>[]): SeoConfig {
	return configs.reduce((acc, config) => {
		return {
			...acc,
			...config,
			base: { ...acc.base, ...config.base },
			openGraph: { ...acc.openGraph, ...config.openGraph },
			twitter: { ...acc.twitter, ...config.twitter },
			facebook: { ...acc.facebook, ...config.facebook },
			article: { ...acc.article, ...config.article },
			linkedin: { ...acc.linkedin, ...config.linkedin }
		};
	}, {} as SeoConfig);
}
