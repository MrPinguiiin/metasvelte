/**
 * SvelteKit hooks untuk SEO
 * Server-side SEO handling
 */

import type { Handle } from '@sveltejs/kit';
import type { SeoConfig } from './types.js';

/**
 * Create SEO handle untuk server-side rendering
 * Bisa digunakan di hooks.server.ts
 */
export function createSeoHandle(defaultConfig?: SeoConfig): Handle {
	return async ({ event, resolve }) => {
		// Attach default SEO config ke event.locals jika diperlukan
		if (defaultConfig) {
			event.locals.seo = defaultConfig;
		}

		return resolve(event);
	};
}

/**
 * Helper untuk generate canonical URL dari request
 */
export function getCanonicalUrl(url: URL, baseUrl?: string): string {
	if (baseUrl) {
		return `${baseUrl}${url.pathname}`;
	}
	return `${url.origin}${url.pathname}`;
}

/**
 * Helper untuk generate Open Graph image URL
 */
export function getOgImageUrl(url: URL, imagePath: string): string {
	if (imagePath.startsWith('http')) {
		return imagePath;
	}
	return `${url.origin}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

// Type augmentation untuk SvelteKit locals
declare global {
	namespace App {
		interface Locals {
			seo?: SeoConfig;
		}
	}
}
