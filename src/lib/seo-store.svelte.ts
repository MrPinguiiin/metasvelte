import type { SeoConfig } from './types.js';
import { deepMerge } from './utils.js';

class SeoStore {
	private defaultConfig = $state<SeoConfig>({});
	private currentConfig = $state<SeoConfig>({});

	constructor() {}

	/**
	 * Set default SEO config (biasanya di root layout)
	 */
	setDefault(config: SeoConfig): void {
		this.defaultConfig = config;
		this.currentConfig = { ...config };
	}

	/**
	 * Get current SEO config
	 */
	get config(): SeoConfig {
		return this.currentConfig;
	}

	/**
	 * Update SEO config (replace)
	 */
	update(config: Partial<SeoConfig>): void {
		this.currentConfig = deepMerge(
			this.defaultConfig as Record<string, unknown>,
			config as Partial<Record<string, unknown>>
		) as SeoConfig;
	}

	/**
	 * Merge SEO config dengan existing config
	 */
	merge(config: Partial<SeoConfig>): void {
		this.currentConfig = deepMerge(
			this.currentConfig as Record<string, unknown>,
			config as Partial<Record<string, unknown>>
		) as SeoConfig;
	}

	/**
	 * Reset ke default config
	 */
	reset(): void {
		this.currentConfig = { ...this.defaultConfig };
	}

	/**
	 * Get specific meta value
	 */
	getMeta<K extends keyof SeoConfig>(key: K): SeoConfig[K] {
		return this.currentConfig[key];
	}
}

// Export singleton instance
export const seoStore = new SeoStore();
