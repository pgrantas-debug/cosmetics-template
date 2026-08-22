// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Fully static output — this template has no server, no database, no
// adapter. It is meant to be deployed as a static site (e.g. Cloudflare
// Pages, static hosting).
export default defineConfig({
	output: 'static',
});
