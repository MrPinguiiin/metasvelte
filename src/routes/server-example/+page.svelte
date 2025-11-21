<script lang="ts">
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{@html data.seoHtml}
</svelte:head>

<div class="container">
	<h1>Server-Side SEO Example</h1>
	
	<div class="info-box">
		<h2>✨ HTML Super Clean</h2>
		<p>
			Halaman ini menggunakan <code>renderSeoTags()</code> dari server-side.
			Meta tags di-render di server tanpa Svelte hydration markers.
		</p>
	</div>

	<div class="steps">
		<h2>Cara Menggunakan</h2>
		<ol>
			<li>
				<strong>Import dari 'metasvelte/server'</strong>
				<pre><code>import &#123; renderSeoTags &#125; from 'metasvelte/server';</code></pre>
			</li>
			<li>
				<strong>Render di +page.server.ts</strong>
				<pre><code>export const load = async () => &#123;
  const seoHtml = renderSeoTags(&#123; ... &#125;);
  return &#123; seoHtml &#125;;
&#125;;</code></pre>
			</li>
			<li>
				<strong>Inject di +page.svelte</strong>
				<pre><code>&lt;svelte:head&gt;
  &#123;@html data.seoHtml&#125;
&lt;/svelte:head&gt;</code></pre>
			</li>
		</ol>
	</div>

	<div class="comparison">
		<h2>Perbandingan</h2>
		<div class="grid">
			<div class="card">
				<h3>Client-Side (SeoHead)</h3>
				<ul>
					<li>✅ Dynamic & Reactive</li>
					<li>✅ Easy to use</li>
					<li>⚠️ Ada hydration markers</li>
					<li>✅ SEO tetap OK</li>
				</ul>
			</div>
			<div class="card">
				<h3>Server-Side (renderSeoTags)</h3>
				<ul>
					<li>✅ HTML super clean</li>
					<li>✅ No hydration markers</li>
					<li>⚠️ Tidak reactive</li>
					<li>✅ SEO perfect</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="note">
		<p>
			<strong>Note:</strong> Untuk kebanyakan kasus, gunakan <code>&lt;SeoHead&gt;</code> component.
			Hydration markers tidak mempengaruhi SEO dan memberikan flexibility yang lebih baik.
		</p>
		<p>
			Gunakan <code>renderSeoTags()</code> hanya jika Anda benar-benar membutuhkan HTML yang
			100% clean tanpa komentar apapun.
		</p>
	</div>

	<div class="test">
		<h2>Test HTML Output</h2>
		<p>Tekan <kbd>Ctrl+U</kbd> (atau <kbd>Cmd+Option+U</kbd> di Mac) untuk view source.</p>
		<p>Anda akan melihat meta tags yang bersih tanpa komentar <code>&lt;!--1t153bb--&gt;</code></p>
	</div>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	h1 {
		color: #ff3e00;
		margin-bottom: 2rem;
	}

	.info-box {
		background: #fff3cd;
		border: 2px solid #ffc107;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.info-box h2 {
		margin-top: 0;
		color: #856404;
	}

	.steps {
		background: white;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.steps ol {
		line-height: 2;
	}

	.steps pre {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin-top: 0.5rem;
	}

	.steps code {
		font-family: 'Courier New', monospace;
		font-size: 0.9rem;
	}

	.comparison {
		margin-bottom: 2rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.card {
		background: white;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.card h3 {
		margin-top: 0;
		color: #ff3e00;
	}

	.card ul {
		list-style: none;
		padding: 0;
	}

	.card li {
		padding: 0.5rem 0;
	}

	.note {
		background: #d1ecf1;
		border: 2px solid #0c5460;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.note p {
		margin: 0.5rem 0;
	}

	.test {
		background: white;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1.5rem;
		text-align: center;
	}

	kbd {
		background: #f5f5f5;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.2rem 0.5rem;
		font-family: monospace;
		font-size: 0.9rem;
	}

	code {
		background: #f5f5f5;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
		font-size: 0.9rem;
	}
</style>
