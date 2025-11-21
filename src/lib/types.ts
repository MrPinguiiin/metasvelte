/**
 * Core SEO Meta Types
 * Type-safe definitions untuk semua meta tags
 */

// Base Meta Types
export interface BaseMeta {
	title?: string;
	description?: string;
	keywords?: string | string[];
	author?: string;
	robots?: string | RobotsConfig;
	canonical?: string;
	viewport?: string;
	charset?: string;
	language?: string;
	themeColor?: string;
}

export interface RobotsConfig {
	index?: boolean;
	follow?: boolean;
	noarchive?: boolean;
	nosnippet?: boolean;
	noimageindex?: boolean;
	maxSnippet?: number;
	maxImagePreview?: 'none' | 'standard' | 'large';
	maxVideoPreview?: number;
}

// Open Graph Types
export interface OpenGraphMeta {
	title?: string;
	description?: string;
	type?:
		| 'website'
		| 'article'
		| 'book'
		| 'profile'
		| 'music.song'
		| 'music.album'
		| 'music.playlist'
		| 'music.radio_station'
		| 'video.movie'
		| 'video.episode'
		| 'video.tv_show'
		| 'video.other';
	url?: string;
	image?: string | OpenGraphImage | OpenGraphImage[];
	siteName?: string;
	locale?: string;
	localeAlternate?: string[];
	determiner?: 'a' | 'an' | 'the' | 'auto' | '';
	audio?: string | OpenGraphAudio[];
	video?: string | OpenGraphVideo[];
}

export interface OpenGraphImage {
	url: string;
	secureUrl?: string;
	type?: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface OpenGraphAudio {
	url: string;
	secureUrl?: string;
	type?: string;
}

export interface OpenGraphVideo {
	url: string;
	secureUrl?: string;
	type?: string;
	width?: number;
	height?: number;
}

// Article-specific Open Graph
export interface OpenGraphArticle {
	publishedTime?: string;
	modifiedTime?: string;
	expirationTime?: string;
	author?: string | string[];
	section?: string;
	tag?: string | string[];
}

// Twitter Card Types
export interface TwitterMeta {
	card?: 'summary' | 'summary_large_image' | 'app' | 'player';
	site?: string;
	siteId?: string;
	creator?: string;
	creatorId?: string;
	title?: string;
	description?: string;
	image?: string | TwitterImage;
	imageAlt?: string;
	player?: string;
	playerWidth?: number;
	playerHeight?: number;
	playerStream?: string;
	app?: TwitterApp;
}

export interface TwitterImage {
	url: string;
	alt?: string;
}

export interface TwitterApp {
	name?: {
		iphone?: string;
		ipad?: string;
		googleplay?: string;
	};
	id?: {
		iphone?: string;
		ipad?: string;
		googleplay?: string;
	};
	url?: {
		iphone?: string;
		ipad?: string;
		googleplay?: string;
	};
}

// Facebook-specific Meta
export interface FacebookMeta {
	appId?: string;
	admins?: string | string[];
	pages?: string;
}

// LinkedIn-specific (menggunakan Open Graph)
export interface LinkedInMeta {
	title?: string;
	description?: string;
	image?: string;
	author?: string;
}

// JSON-LD Schema Types
export type SchemaType =
	| 'Article'
	| 'BlogPosting'
	| 'NewsArticle'
	| 'Person'
	| 'Organization'
	| 'WebSite'
	| 'WebPage'
	| 'Product'
	| 'Event'
	| 'Recipe'
	| 'Course'
	| 'FAQPage'
	| 'BreadcrumbList';

export interface JsonLdSchema {
	'@context'?: string;
	'@type': SchemaType | string;
	[key: string]: unknown;
}

// Complete SEO Config
export interface SeoConfig {
	base?: BaseMeta;
	openGraph?: OpenGraphMeta;
	article?: OpenGraphArticle;
	twitter?: TwitterMeta;
	facebook?: FacebookMeta;
	linkedin?: LinkedInMeta;
	jsonLd?: JsonLdSchema | JsonLdSchema[];
	additionalMetaTags?: MetaTag[];
	additionalLinkTags?: LinkTag[];
}

export interface MetaTag {
	name?: string;
	property?: string;
	content: string;
	httpEquiv?: string;
}

export interface LinkTag {
	rel: string;
	href: string;
	hreflang?: string;
	type?: string;
	sizes?: string;
	media?: string;
}

// Route-specific SEO Config dengan Generic Support
export interface RouteSeoConfig<T = unknown> extends SeoConfig {
	template?: (data: T) => Partial<SeoConfig>;
}

// SEO Context Type
export interface SeoContext {
	config: SeoConfig;
	update: (newConfig: Partial<SeoConfig>) => void;
	merge: (newConfig: Partial<SeoConfig>) => void;
	reset: () => void;
}
