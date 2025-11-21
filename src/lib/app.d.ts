import type { SeoConfig } from './types.js';

declare global {
	namespace App {
		interface Locals {
			seo?: SeoConfig;
		}
	}
}

export {};
