# MetaSvelte - Contoh Penggunaan Advanced

## 1. Multi-Language SEO

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const translations = {
		en: { title: 'Welcome', description: 'Welcome to my site' },
		id: { title: 'Selamat Datang', description: 'Selamat datang di situs saya' }
	};

	const lang = 'id';
	const t = translations[lang];

	const seo = {
		base: { title: t.title, description: t.description, language: lang },
		openGraph: { locale: 'id_ID', localeAlternate: ['en_US', 'id_ID'] },
		additionalLinkTags: [
			{ rel: 'alternate', hreflang: 'en', href: 'https://site.com/en' },
			{ rel: 'alternate', hreflang: 'id', href: 'https://site.com/id' }
		]
	};
</script>

<SeoHead config={seo} />
```

## 2. Recipe SEO dengan JSON-LD

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const recipeSeo = {
		base: {
			title: 'Nasi Goreng Recipe - Indonesian Fried Rice',
			description: 'Authentic Indonesian fried rice recipe'
		},
		jsonLd: {
			'@type': 'Recipe',
			name: 'Nasi Goreng',
			description: 'Authentic Indonesian fried rice',
			image: 'https://site.com/recipes/nasi-goreng.jpg',
			author: { '@type': 'Person', name: 'Chef John' },
			datePublished: '2024-01-15',
			prepTime: 'PT15M',
			cookTime: 'PT10M',
			totalTime: 'PT25M',
			recipeYield: '4 servings',
			recipeIngredient: ['Rice', 'Eggs', 'Chicken', 'Soy Sauce'],
			recipeInstructions: [
				{ '@type': 'HowToStep', text: 'Cook rice' },
				{ '@type': 'HowToStep', text: 'Fry ingredients' }
			]
		}
	};
</script>

<SeoHead config={recipeSeo} />
```

## 3. Course/Tutorial SEO

```svelte
<script lang="ts">
	import { SeoHead } from 'metasvelte';

	const courseSeo = {
		base: {
			title: 'Complete SvelteKit Course',
			description: 'Learn SvelteKit from scratch'
		},
		jsonLd: {
			'@type': 'Course',
			name: 'Complete SvelteKit Course',
			description: 'Learn SvelteKit from scratch',
			provider: {
				'@type': 'Organization',
				name: 'My Learning Platform'
			},
			offers: {
				'@type': 'Offer',
				price: '49.99',
				priceCurrency: 'USD'
			}
		}
	};
</script>

<SeoHead config={courseSeo} />
```
