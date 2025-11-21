<script lang="ts">
	import { SeoHead, seoStore } from '$lib/index.js';
	import { onMount } from 'svelte';

	let currentSeo = $state<'default' | 'article' | 'product'>('default');
	let customTitle = $state('Custom Page Title');
	let customDescription = $state('Custom page description');

	const seoConfigs = {
		default: {
			base: {
				title: 'Demo Page - MetaSvelte',
				description: 'Demo halaman untuk testing MetaSvelte'
			}
		},
		article: {
			base: {
				title: 'Article Demo - MetaSvelte',
				description: 'Demo artikel dengan SEO lengkap'
			},
			openGraph: {
				type: 'article' as const,
				title: 'Article Demo',
				image: 'https://via.placeholder.com/1200x630'
			},
			twitter: {
				card: 'summary_large_image' as const,
				title: 'Article Demo'
			}
		},
		product: {
			base: {
				title: 'Product Demo - MetaSvelte',
				description: 'Demo produk e-commerce'
			},
			openGraph: {
				type: 'website' as const,
				image: 'https://via.placeholder.com/1200x630'
			}
		}
	};

	const activeSeo = $derived(seoConfigs[currentSeo as keyof typeof seoConfigs]);

	function updateSeo(type: keyof typeof seoConfigs) {
		currentSeo = type;
	}

	function updateCustomSeo() {
		seoStore.update({
			base: {
				title: customTitle,
				description: customDescription
			}
		});
	}
</script>

<SeoHead config={activeSeo} />

<div class="demo-container">
	<h1>MetaSvelte Demo</h1>
	
	<section class="controls">
		<h2>Pilih SEO Preset</h2>
		<div class="buttons">
			<button onclick={() => updateSeo('default')}>Default</button>
			<button onclick={() => updateSeo('article')}>Article</button>
			<button onclick={() => updateSeo('product')}>Product</button>
		</div>
	</section>

	<section class="custom">
		<h2>Custom SEO</h2>
		<div class="form">
			<label>
				Title:
				<input type="text" bind:value={customTitle} />
			</label>
			<label>
				Description:
				<textarea bind:value={customDescription}></textarea>
			</label>
			<button onclick={updateCustomSeo}>Update SEO</button>
		</div>
	</section>

	<section class="info">
		<h2>Current SEO Config</h2>
		<pre>{JSON.stringify(activeSeo, null, 2)}</pre>
	</section>

	<section class="instructions">
		<h2>Cara Testing</h2>
		<ol>
			<li>Pilih preset SEO di atas</li>
			<li>Buka DevTools dan lihat tab Elements</li>
			<li>Cari tag &lt;head&gt; dan lihat meta tags yang di-generate</li>
			<li>Atau gunakan tools seperti:
				<ul>
					<li><a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Debugger</a></li>
					<li><a href="https://cards-dev.twitter.com/validator" target="_blank">Twitter Validator</a></li>
				</ul>
			</li>
		</ol>
	</section>
</div>

<style>
	.demo-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	section {
		margin: 2rem 0;
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	button {
		padding: 0.5rem 1rem;
		background: #ff3e00;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #cc3200;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	input, textarea {
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	textarea {
		min-height: 100px;
	}

	pre {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}

	ol, ul {
		margin-left: 1.5rem;
	}

	a {
		color: #ff3e00;
	}
</style>
