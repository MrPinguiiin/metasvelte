<script lang="ts">
	import { SeoHead, generateMetaTags, generateLinkTags } from '$lib/index.js';
	import type { SeoConfig } from '$lib/index.js';

	let currentSeo = $state<'minimal' | 'article' | 'product'>('minimal');

	const seoConfigs: Record<string, SeoConfig> = {
		minimal: {
			base: {
				title: 'Demo Minimal - MetaSvelte',
				description: 'Demo dengan meta tags minimal'
			}
		},
		article: {
			base: {
				title: 'Article Demo - MetaSvelte',
				description: 'Demo artikel dengan Open Graph dan Twitter Cards',
				canonical: 'https://yoursite.com/demo'
			},
			openGraph: {
				type: 'article' as const,
				title: 'Article Demo',
				description: 'Demo artikel dengan SEO lengkap',
				url: 'https://yoursite.com/demo',
				image: 'https://via.placeholder.com/1200x630',
				siteName: 'MetaSvelte'
			},
			twitter: {
				card: 'summary_large_image' as const,
				title: 'Article Demo',
				description: 'Demo artikel dengan SEO lengkap',
				image: 'https://via.placeholder.com/1200x630'
			}
		},
		product: {
			base: {
				title: 'Product Demo - MetaSvelte',
				description: 'Demo produk e-commerce dengan JSON-LD',
				canonical: 'https://yoursite.com/demo'
			},
			openGraph: {
				type: 'website' as const,
				title: 'Product Demo',
				image: 'https://via.placeholder.com/1200x630'
			},
			twitter: {
				card: 'summary_large_image' as const
			},
			jsonLd: {
				'@type': 'Product',
				name: 'Amazing Product',
				description: 'Demo produk e-commerce',
				image: 'https://via.placeholder.com/1200x630',
				offers: {
					'@type': 'Offer',
					price: '99.99',
					priceCurrency: 'USD'
				}
			}
		}
	};

	const activeSeo = $derived(seoConfigs[currentSeo]);
	const metaTags = $derived(generateMetaTags(activeSeo));
	const linkTags = $derived(generateLinkTags(activeSeo));

	function updateSeo(type: 'minimal' | 'article' | 'product') {
		currentSeo = type;
	}
</script>

<SeoHead config={activeSeo} />

<div class="demo-container">
	<header class="demo-header">
		<h1>🚀 MetaSvelte Demo</h1>
		<p>Library SEO meta management untuk SvelteKit</p>
	</header>

	<section class="preset-selector">
		<h2>Pilih Preset SEO</h2>
		<div class="preset-buttons">
			<button class:active={currentSeo === 'minimal'} onclick={() => updateSeo('minimal')}>
				📄 Minimal
			</button>
			<button class:active={currentSeo === 'article'} onclick={() => updateSeo('article')}>
				📝 Article
			</button>
			<button class:active={currentSeo === 'product'} onclick={() => updateSeo('product')}>
				🛍️ Product
			</button>
		</div>
	</section>

	<div class="grid">
		<section class="meta-preview">
			<h2>📋 Generated Meta Tags</h2>
			<div class="meta-group">
				<h3>Base Meta</h3>
				{#if activeSeo.base?.title}
					<div class="meta-item">
						<code>&lt;title&gt;</code>
						<span>{activeSeo.base.title}</span>
					</div>
				{/if}
				{#each metaTags.filter((t) => t.name && !t.name.startsWith('twitter:') && !t.name.startsWith('og:')) as tag}
					<div class="meta-item">
						<code>&lt;meta name="{tag.name}"&gt;</code>
						<span>{tag.content}</span>
					</div>
				{/each}
			</div>

			{#if metaTags.some((t) => t.property?.startsWith('og:'))}
				<div class="meta-group">
					<h3>Open Graph (Facebook, LinkedIn)</h3>
					{#each metaTags.filter((t) => t.property?.startsWith('og:')) as tag}
						<div class="meta-item">
							<code>&lt;meta property="{tag.property}"&gt;</code>
							<span>{tag.content}</span>
						</div>
					{/each}
				</div>
			{/if}

			{#if metaTags.some((t) => t.name?.startsWith('twitter:'))}
				<div class="meta-group">
					<h3>Twitter Cards</h3>
					{#each metaTags.filter((t) => t.name?.startsWith('twitter:')) as tag}
						<div class="meta-item">
							<code>&lt;meta name="{tag.name}"&gt;</code>
							<span>{tag.content}</span>
						</div>
					{/each}
				</div>
			{/if}

			{#if linkTags.length > 0}
				<div class="meta-group">
					<h3>Link Tags</h3>
					{#each linkTags as link}
						<div class="meta-item">
							<code>&lt;link rel="{link.rel}"&gt;</code>
							<span>{link.href}</span>
						</div>
					{/each}
				</div>
			{/if}

			{#if activeSeo.jsonLd}
				<div class="meta-group">
					<h3>JSON-LD Schema</h3>
					<pre class="json-ld">{JSON.stringify(activeSeo.jsonLd, null, 2)}</pre>
				</div>
			{/if}
		</section>

		<section class="config-preview">
			<h2>⚙️ SEO Config</h2>
			<pre class="config-code">{JSON.stringify(activeSeo, null, 2)}</pre>
		</section>
	</div>

	<section class="testing-tools">
		<h2>🔍 Testing Tools</h2>
		<div class="tools-grid">
			<a href="https://developers.facebook.com/tools/debug/" target="_blank" class="tool-card">
				<span class="tool-icon">📘</span>
				<span class="tool-name">Facebook Debugger</span>
			</a>
			<a href="https://cards-dev.twitter.com/validator" target="_blank" class="tool-card">
				<span class="tool-icon">🐦</span>
				<span class="tool-name">Twitter Validator</span>
			</a>
			<a href="https://www.linkedin.com/post-inspector/" target="_blank" class="tool-card">
				<span class="tool-icon">💼</span>
				<span class="tool-name">LinkedIn Inspector</span>
			</a>
			<a href="https://search.google.com/test/rich-results" target="_blank" class="tool-card">
				<span class="tool-icon">🔍</span>
				<span class="tool-name">Google Rich Results</span>
			</a>
		</div>
	</section>
</div>

<style>
	.demo-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.demo-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.demo-header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #ff3e00;
	}

	.demo-header p {
		color: #666;
		font-size: 1.1rem;
	}

	.preset-selector {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}

	.preset-selector h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.preset-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.75rem 1.5rem;
		background: #f5f5f5;
		color: #333;
		border: 2px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s;
	}

	button:hover {
		background: #e5e5e5;
	}

	button.active {
		background: #ff3e00;
		color: white;
		border-color: #ff3e00;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	section {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		font-size: 1.3rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h3 {
		font-size: 1rem;
		color: #ff3e00;
		margin-top: 0;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #ff3e00;
	}

	.meta-group {
		margin-bottom: 2rem;
	}

	.meta-group:last-child {
		margin-bottom: 0;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		background: #f9f9f9;
		border-radius: 6px;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.meta-item code {
		color: #ff3e00;
		font-family: 'Courier New', monospace;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.meta-item span {
		color: #666;
		word-break: break-word;
	}

	pre {
		background: #1e1e1e;
		color: #d4d4d4;
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0;
	}

	.json-ld {
		max-height: 300px;
		overflow-y: auto;
	}

	.config-code {
		max-height: 600px;
		overflow-y: auto;
	}

	.testing-tools {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.tool-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem;
		background: #f9f9f9;
		border: 2px solid transparent;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		transition: all 0.2s;
	}

	.tool-card:hover {
		background: #ff3e00;
		color: white;
		border-color: #ff3e00;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 62, 0, 0.2);
	}

	.tool-icon {
		font-size: 2rem;
	}

	.tool-name {
		font-weight: 600;
		text-align: center;
	}
</style>
