<script lang="ts">
	import { SeoHead, createArticleSeo } from '$lib/index.js';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	// Generate SEO config dari data artikel
	const articleSeo = $derived(createArticleSeo({
		title: data.article.title,
		description: data.article.excerpt,
		url: `https://yoursite.com/blog/${data.article.slug}`,
		image: data.article.coverImage,
		author: data.article.author,
		publishedTime: data.article.publishedAt,
		modifiedTime: data.article.updatedAt,
		section: data.article.category,
		tags: data.article.tags,
		siteName: 'MetaSvelte Blog',
		twitterHandle: '@yourhandle'
	}));
</script>

<SeoHead config={articleSeo} />

<article>
	<h1>{data.article.title}</h1>
	<p>{data.article.content}</p>
</article>
