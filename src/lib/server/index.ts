/**
 * MetaSvelte Server Utilities
 * 
 * Import dari 'metasvelte/server' untuk server-side rendering
 * 
 * @example
 * ```typescript
 * import { renderSeoTags } from 'metasvelte/server';
 * ```
 */

export { renderSeoTags } from './seo-renderer.js';

// Re-export types yang diperlukan
export type { SeoConfig } from '../types.js';
