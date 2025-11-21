# MetaSvelte Documentation

Library SEO meta management yang powerful, type-safe, dan modular untuk SvelteKit 5.

## 📋 Daftar Isi

- [Instalasi](#instalasi)
- [Quick Start](#quick-start)
- [Fitur Utama](#fitur-utama)
- [API Reference](#api-reference)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Best Practices](#best-practices)

## 🚀 Instalasi

```bash
npm install metasvelte
# atau
pnpm add metasvelte
# atau
bun add metasvelte
```

## ⚡ Quick Start

### 1. Setup Default SEO di Root Layout

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { SeoHead, seoStore, createSeoConfig } from 'metasvelte';

	const defaultSeo = createSeoConfig({
		base: {
			title: 'My Awesome Site',
			description: 'Deskripsi website Anda',
			keywords: ['sveltekit', 'seo'],
			author: 'Your Name'
		},
		openGraph: {
			type: 'website',
			siteName: 'My Awesome Site',
			locale: 'id_ID'
		},
		twitter: {
			card: 'summary_large_image',
			site: '@yourhandle'
		}
	});

	seoStore.setDefault(defaultSeo);

	let { children } = $props();
</script>

<SeoHead />
{@render children()}
```

### 2. Override SEO di Halaman Spesifik

```svelte
<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const aboutSeo = {
		base: {
			title: 'About Us - My Awesome Site',
			description: 'Tentang kami dan misi kami',
			canonical: 'https://mysite.com/about'
		},
		openGraph: {
			title: 'About Us',
			url: 'https://mysite.com/about',
			image: 'https://mysite.com/about-og.jpg'
		}
	};
</script>

<SeoHead config={aboutSeo} />

<main>
	<h1>About Us</h1>
</main>
```

## 🎯 Fitur Utama

### ✅ Type-Safe

Semua konfigurasi SEO memiliki TypeScript types yang lengkap:

```typescript
import type { SeoConfig, OpenGraphMeta, TwitterMeta } from 'metasvelte';

const config: SeoConfig = {
	base: {
		title: 'My Page',
		description: 'Page description'
	}
};
```

### ✅ Modular & Composable

Gunakan helper functions untuk membuat config dengan mudah:

```typescript
import { 
	createBaseSeo, 
	createOpenGraph, 
	createTwitterCard,
	mergeSeoConfigs 
} from 'metasvelte';

const baseSeo = createBaseSeo({
	title: 'My Page',
	description: 'Description'
});

const ogSeo = createOpenGraph({
	type: 'article',
	image: '/og-image.jpg'
});

const finalSeo = mergeSeoConfigs(baseSeo, ogSeo);
```

### ✅ Dinamis per Route

SEO config bisa disesuaikan di setiap route:

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Reactive SEO config berdasarkan data
	const seo = $derived({
		base: {
			title: data.product.name,
			description: data.product.description
		},
		openGraph: {
			image: data.product.image
		}
	});
</script>

<SeoHead config={seo} />
```

### ✅ Support Semua Platform

- **Open Graph** (Facebook, LinkedIn, WhatsApp)
- **Twitter Cards**
- **Facebook-specific tags**
- **JSON-LD Schema**
- **Standard meta tags**

## 📚 API Reference

### Components

#### `<SeoHead>`

Komponen utama untuk render SEO meta tags.

**Props:**
- `config?: Partial<SeoConfig>` - SEO configuration
- `merge?: boolean` - Merge dengan config existing (default: false)

**Contoh:**
```svelte
<SeoHead config={mySeoConfig} />
<SeoHead config={additionalSeo} merge={true} />
```

### Store

#### `seoStore`

Global store untuk manage SEO state.

**Methods:**
- `setDefault(config: SeoConfig)` - Set default SEO config
- `update(config: Partial<SeoConfig>)` - Update config (replace)
- `merge(config: Partial<SeoConfig>)` - Merge dengan existing config
- `reset()` - Reset ke default config
- `getMeta<K>(key: K)` - Get specific meta value

**Contoh:**
```typescript
import { seoStore } from 'metasvelte';

// Set default
seoStore.setDefault(defaultConfig);

// Update
seoStore.update({ base: { title: 'New Title' } });

// Merge
seoStore.merge({ openGraph: { image: '/new-image.jpg' } });

// Reset
seoStore.reset();
```

### Helper Functions

#### `createSeoConfig(config)`

Membuat SEO config dengan defaults yang smart.

```typescript
const config = createSeoConfig({
	base: {
		title: 'My Site',
		description: 'Description'
	}
});
```

#### `createArticleSeo(options)`

Helper untuk membuat SEO config artikel/blog.

```typescript
const articleSeo = createArticleSeo({
	title: 'Article Title',
	description: 'Article description',
	url: 'https://site.com/article',
	image: 'https://site.com/image.jpg',
	author: 'John Doe',
	publishedTime: '2024-01-15T10:00:00Z',
	modifiedTime: '2024-01-20T15:30:00Z',
	section: 'Technology',
	tags: ['tech', 'tutorial'],
	siteName: 'My Blog',
	twitterHandle: '@myhandle'
});
```

#### `createProductSeo(options)`

Helper untuk membuat SEO config produk e-commerce.

```typescript
const productSeo = createProductSeo({
	name: 'Product Name',
	description: 'Product description',
	url: 'https://site.com/product',
	image: 'https://site.com/product.jpg',
	price: '99.99',
	currency: 'USD',
	availability: 'InStock',
	brand: 'Brand Name',
	rating: {
		value: 4.5,
		count: 120
	}
});
```

#### `createOrganizationSeo(options)`

Helper untuk membuat SEO config organization/website.

```typescript
const orgSeo = createOrganizationSeo({
	name: 'Company Name',
	description: 'Company description',
	url: 'https://company.com',
	logo: 'https://company.com/logo.png',
	socialProfiles: [
		'https://twitter.com/company',
		'https://facebook.com/company'
	],
	contactPoint: {
		telephone: '+1-234-567-8900',
		contactType: 'Customer Service'
	}
});
```

#### `mergeSeoConfigs(...configs)`

Merge multiple SEO configs.

```typescript
const merged = mergeSeoConfigs(
	defaultConfig,
	pageConfig,
	dynamicConfig
);
```

### Types

#### `SeoConfig`

Main configuration interface:

```typescript
interface SeoConfig {
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
```

#### `BaseMeta`

```typescript
interface BaseMeta {
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
```

#### `OpenGraphMeta`

```typescript
interface OpenGraphMeta {
	title?: string;
	description?: string;
	type?: 'website' | 'article' | 'book' | 'profile' | ...;
	url?: string;
	image?: string | OpenGraphImage | OpenGraphImage[];
	siteName?: string;
	locale?: string;
	localeAlternate?: string[];
	audio?: string | OpenGraphAudio[];
	video?: string | OpenGraphVideo[];
}
```

#### `TwitterMeta`

```typescript
interface TwitterMeta {
	card?: 'summary' | 'summary_large_image' | 'app' | 'player';
	site?: string;
	creator?: string;
	title?: string;
	description?: string;
	image?: string | TwitterImage;
	app?: TwitterApp;
}
```

### Presets

Library menyediakan presets untuk use cases umum:

```typescript
import { 
	defaultSeoPreset,
	blogPreset,
	ecommercePreset,
	landingPagePreset,
	noIndexPreset,
	robotsPresets,
	socialPresets
} from 'metasvelte';

// Gunakan preset
const config = {
	...blogPreset,
	base: {
		title: 'My Blog'
	}
};

// Robots presets
const robots = robotsPresets.permissive;

// Social presets
const twitter = socialPresets.twitter.summaryLargeImage;
```

## 💡 Contoh Penggunaan

### 1. Blog Post dengan SEO Lengkap

```svelte
<script lang="ts">
	import { SeoHead, createArticleSeo } from 'metasvelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const seo = $derived(createArticleSeo({
		title: data.post.title,
		description: data.post.excerpt,
		url: `https://myblog.com/posts/${data.post.slug}`,
		image: data.post.coverImage,
		author: data.post.author.name,
		publishedTime: data.post.publishedAt,
		modifiedTime: data.post.updatedAt,
		section: data.post.category,
		tags: data.post.tags,
		siteName: 'My Awesome Blog',
		twitterHandle: '@myblog'
	}));
</script>

<SeoHead config={seo} />

<article>
	<h1>{data.post.title}</h1>
	<div>{@html data.post.content}</div>
</article>
```

### 2. E-commerce Product Page

```svelte
<script lang="ts">
	import { SeoHead, createProductSeo } from 'metasvelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const seo = $derived(createProductSeo({
		name: data.product.name,
		description: data.product.description,
		url: `https://mystore.com/products/${data.product.id}`,
		image: data.product.images,
		price: data.product.price.toString(),
		currency: 'USD',
		availability: data.product.inStock ? 'InStock' : 'OutOfStock',
		brand: data.product.brand,
		rating: {
			value: data.product.rating,
			count: data.product.reviewCount
		}
	}));
</script>

<SeoHead config={seo} />

<div class="product">
	<h1>{data.product.name}</h1>
	<p>{data.product.description}</p>
	<p>Price: ${data.product.price}</p>
</div>
```

### 3. Dynamic SEO dengan Load Function

```typescript
// +page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
	const post = await fetchPost(params.slug);

	return {
		post,
		seo: {
			base: {
				title: post.title,
				description: post.excerpt,
				canonical: url.href
			},
			openGraph: {
				type: 'article',
				title: post.title,
				description: post.excerpt,
				image: post.coverImage,
				url: url.href
			},
			twitter: {
				card: 'summary_large_image',
				title: post.title,
				description: post.excerpt,
				image: post.coverImage
			}
		}
	};
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
	import { SeoHead } from 'metasvelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead config={data.seo} />

<article>
	<h1>{data.post.title}</h1>
</article>
```

### 4. Multi-language SEO

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';
	import { page } from '$app/stores';

	const languages = {
		en: {
			title: 'Welcome to My Site',
			description: 'This is my awesome website'
		},
		id: {
			title: 'Selamat Datang di Situs Saya',
			description: 'Ini adalah website saya yang keren'
		}
	};

	const currentLang = $page.params.lang || 'en';
	const content = languages[currentLang];

	const seo = {
		base: {
			title: content.title,
			description: content.description,
			language: currentLang
		},
		openGraph: {
			locale: currentLang === 'en' ? 'en_US' : 'id_ID',
			localeAlternate: ['en_US', 'id_ID']
		},
		additionalLinkTags: [
			{ rel: 'alternate', hreflang: 'en', href: 'https://site.com/en' },
			{ rel: 'alternate', hreflang: 'id', href: 'https://site.com/id' }
		]
	};
</script>

<SeoHead config={seo} />
```

### 5. JSON-LD Schema untuk FAQ Page

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const faqs = [
		{
			question: 'Apa itu MetaSvelte?',
			answer: 'MetaSvelte adalah library SEO untuk SvelteKit'
		},
		{
			question: 'Bagaimana cara menggunakannya?',
			answer: 'Install dan import komponen SeoHead'
		}
	];

	const seo = {
		base: {
			title: 'FAQ - Frequently Asked Questions',
			description: 'Pertanyaan yang sering ditanyakan'
		},
		jsonLd: {
			'@type': 'FAQPage',
			mainEntity: faqs.map(faq => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		}
	};
</script>

<SeoHead config={seo} />

<div class="faq">
	{#each faqs as faq}
		<div>
			<h3>{faq.question}</h3>
			<p>{faq.answer}</p>
		</div>
	{/each}
</div>
```

### 6. Conditional SEO (No-Index untuk Development)

```svelte
<script lang="ts">
	import { SeoHead, noIndexPreset } from 'metasvelte';
	import { dev } from '$app/environment';

	const seo = {
		base: {
			title: 'My Page',
			description: 'Page description',
			// No-index di development
			robots: dev ? 'noindex, nofollow' : 'index, follow'
		}
	};
</script>

<SeoHead config={seo} />
```

### 7. Custom Meta Tags

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const seo = {
		base: {
			title: 'My Page'
		},
		additionalMetaTags: [
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
			{ property: 'custom:property', content: 'custom value' }
		],
		additionalLinkTags: [
			{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
			{ rel: 'manifest', href: '/manifest.json' }
		]
	};
</script>

<SeoHead config={seo} />
```

## 🎨 Best Practices

### 1. Set Default SEO di Root Layout

Selalu set default SEO config di root layout untuk fallback:

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { seoStore, createSeoConfig } from 'metasvelte';

	seoStore.setDefault(createSeoConfig({
		base: {
			title: 'Default Title',
			description: 'Default description'
		}
	}));
</script>
```

### 2. Gunakan Canonical URLs

Selalu set canonical URL untuk menghindari duplicate content:

```typescript
const seo = {
	base: {
		canonical: 'https://yoursite.com/page'
	}
};
```

### 3. Optimize Images untuk Social Media

Gunakan ukuran image yang tepat:
- **Open Graph**: 1200x630px
- **Twitter Summary**: 120x120px minimum
- **Twitter Large Image**: 280x150px minimum

```typescript
const seo = {
	openGraph: {
		image: {
			url: 'https://site.com/og-image.jpg',
			width: 1200,
			height: 630,
			alt: 'Image description'
		}
	}
};
```

### 4. Gunakan Structured Data (JSON-LD)

Tambahkan structured data untuk rich snippets:

```typescript
const seo = {
	jsonLd: {
		'@type': 'Article',
		headline: 'Article Title',
		author: {
			'@type': 'Person',
			name: 'Author Name'
		},
		datePublished: '2024-01-15'
	}
};
```

### 5. Test SEO Tags

Gunakan tools berikut untuk test:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### 6. Dynamic SEO dengan Server Load

Untuk SEO yang optimal, load data di server:

```typescript
// +page.server.ts
export const load: PageServerLoad = async ({ params }) => {
	const data = await fetchData(params.id);
	
	return {
		data,
		seo: generateSeoFromData(data)
	};
};
```

### 7. Handle Missing Data

Selalu provide fallback values:

```typescript
const seo = $derived({
	base: {
		title: data?.title || 'Default Title',
		description: data?.description || 'Default description'
	}
});
```

## 🔧 Advanced Usage

### Custom SEO Hook

```typescript
// hooks.server.ts
import { createSeoHandle } from 'metasvelte';

export const handle = createSeoHandle({
	base: {
		title: 'Default Title',
		description: 'Default description'
	}
});
```

### Type-Safe Route Config

```typescript
import type { RouteSeoConfig } from 'metasvelte';

interface BlogPost {
	title: string;
	excerpt: string;
	slug: string;
}

const blogSeoConfig: RouteSeoConfig<BlogPost> = {
	template: (post) => ({
		base: {
			title: post.title,
			description: post.excerpt
		}
	})
};
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
