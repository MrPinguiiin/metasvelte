# MetaSvelte 🚀

Library SEO meta management yang **powerful**, **type-safe**, dan **modular** untuk SvelteKit 5.

[![npm version](https://img.shields.io/npm/v/metasvelte.svg)](https://www.npmjs.com/package/metasvelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Fitur

- 🎯 **Type-Safe** - Full TypeScript support dengan type inference
- 🧩 **Modular** - Composable helpers untuk berbagai use cases
- 🔄 **Dinamis** - SEO config bisa disesuaikan per route
- 🌐 **Multi-Platform** - Support Open Graph, Twitter Cards, Facebook, LinkedIn
- 📊 **JSON-LD** - Built-in support untuk structured data
- ⚡ **Svelte 5 Runes** - Menggunakan Svelte 5 reactive system
- 🎨 **Presets** - Pre-configured templates untuk use cases umum

## 📦 Instalasi

```bash
npm install metasvelte
# atau
pnpm add metasvelte
# atau
bun add metasvelte
```

## 🚀 Quick Start

### 1. Setup di Root Layout

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { SeoHead, seoStore, createSeoConfig } from 'metasvelte';

	const defaultSeo = createSeoConfig({
		base: {
			title: 'My Awesome Site',
			description: 'Deskripsi website Anda',
			keywords: ['sveltekit', 'seo']
		},
		openGraph: {
			type: 'website',
			siteName: 'My Awesome Site'
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

### 2. Override di Halaman Spesifik

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
```

### 3. Dynamic SEO untuk Blog Post

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
		author: data.post.author,
		publishedTime: data.post.publishedAt,
		tags: data.post.tags
	}));
</script>

<SeoHead config={seo} />
```

## 📚 Dokumentasi Lengkap

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md) untuk dokumentasi lengkap.

## 🎯 Use Cases

### Blog/Article

```typescript
import { createArticleSeo } from 'metasvelte';

const seo = createArticleSeo({
	title: 'Article Title',
	description: 'Article description',
	url: 'https://site.com/article',
	image: 'https://site.com/image.jpg',
	author: 'John Doe',
	publishedTime: '2024-01-15T10:00:00Z'
});
```

### E-commerce Product

```typescript
import { createProductSeo } from 'metasvelte';

const seo = createProductSeo({
	name: 'Product Name',
	description: 'Product description',
	url: 'https://site.com/product',
	image: 'https://site.com/product.jpg',
	price: '99.99',
	currency: 'USD'
});
```

## 🔧 API Overview

### Components
- `<SeoHead>` - Komponen utama untuk render meta tags

### Store
- `seoStore` - Global state management untuk SEO config

### Helpers
- `createSeoConfig()` - Create SEO config dengan defaults
- `createArticleSeo()` - Helper untuk artikel/blog
- `createProductSeo()` - Helper untuk produk e-commerce
- `createOrganizationSeo()` - Helper untuk organization
- `mergeSeoConfigs()` - Merge multiple configs

## 🧪 Testing SEO

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome!


## ❓ FAQ

### Kenapa ada komentar `<!--1t153bb-->` di HTML?

Ini adalah **Svelte hydration markers** dan **tidak mempengaruhi SEO**. Search engine crawler (Google, Facebook, Twitter) mengabaikan komentar HTML ini. Meta tags Anda tetap terbaca dengan sempurna.

Lihat [HYDRATION_MARKERS.md](./HYDRATION_MARKERS.md) untuk penjelasan lengkap.

### Apakah meta tags duplikat?

Pastikan hanya render `<SeoHead>` di page, **bukan** di layout. Layout hanya untuk set default config:

```svelte
<!-- +layout.svelte - HANYA set default -->
<script>
  import { seoStore, createSeoConfig } from 'metasvelte';
  seoStore.setDefault(createSeoConfig({ ... }));
</script>

<!-- +page.svelte - Render SeoHead -->
<script>
  import { SeoHead } from 'metasvelte';
</script>
<SeoHead config={{ ... }} />
```


## 🖥️ Server-Side Rendering (Optional)

Jika Anda ingin HTML yang **100% clean tanpa hydration markers**, gunakan server-side rendering:

```typescript
// +page.server.ts
import { renderSeoTags } from 'metasvelte/server';

export const load = async () => {
  const seoHtml = renderSeoTags({
    base: { title: 'My Page', description: '...' }
  });
  return { seoHtml };
};
```

```svelte
<!-- +page.svelte -->
<svelte:head>
  {@html data.seoHtml}
</svelte:head>
```

Lihat `/server-example` untuk demo lengkap.
