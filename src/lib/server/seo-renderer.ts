/**
 * Server-side SEO renderer
 * Untuk render meta tags tanpa Svelte hydration markers
 */

import type { SeoConfig, MetaTag, LinkTag } from '../types.js';
import { generateMetaTags, generateLinkTags, generateJsonLd } from '../utils.js';

/**
 * Render meta tags sebagai HTML string (server-side only)
 */
export function renderSeoTags(config: SeoConfig): string {
	const metaTags = generateMetaTags(config);
	const linkTags = generateLinkTags(config);
	const title = config.base?.title || '';
	const jsonLdScript = config.jsonLd ? generateJsonLd(config.jsonLd) : null;

	let html = '';

	// Title
	if (title) {
		html += `<title>${escapeHtml(title)}</title>\n`;
	}

	// Meta tags
	for (const tag of metaTags) {
		if (tag.name) {
			html += `<meta name="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}">\n`;
		} else if (tag.property) {
			html += `<meta property="${escapeHtml(tag.property)}" content="${escapeHtml(tag.content)}">\n`;
		} else if (tag.httpEquiv) {
			html += `<meta http-equiv="${escapeHtml(tag.httpEquiv)}" content="${escapeHtml(tag.content)}">\n`;
		}
	}

	// Link tags
	for (const link of linkTags) {
		let linkHtml = `<link rel="${escapeHtml(link.rel)}" href="${escapeHtml(link.href)}"`;
		if (link.hreflang) linkHtml += ` hreflang="${escapeHtml(link.hreflang)}"`;
		if (link.type) linkHtml += ` type="${escapeHtml(link.type)}"`;
		if (link.sizes) linkHtml += ` sizes="${escapeHtml(link.sizes)}"`;
		if (link.media) linkHtml += ` media="${escapeHtml(link.media)}"`;
		linkHtml += '>\n';
		html += linkHtml;
	}

	// JSON-LD
	if (jsonLdScript) {
		html += `<script type="application/ld+json">${jsonLdScript}</script>\n`;
	}

	return html;
}

/**
 * Escape HTML untuk prevent XSS
 */
function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
}
