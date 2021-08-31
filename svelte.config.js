// needed by tailwind
import preprocess from 'svelte-preprocess';

// needed to build the nodeJS dist
import adapter from '@sveltejs/adapter-node';

// needed to deal with browser-only modules with side effects (yuk)
// see: https://kit.svelte.dev/faq ("How do I use a client-side only library that depends on document or window?")
import { isoImport } from 'vite-plugin-iso-import'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// // Consult https://github.com/sveltejs/svelte-preprocess
	// // for more information about preprocessors
	// preprocess: preprocess({
	// 	defaults: {
	// 		style: 'postcss'
	// 	},
	// 	postcss: true
	// }),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			out: 'node-dist',
			fallback: null
		}),
		ssr: false,
		prerender: {
			enabled: false
		},
		vite: {
			optimizeDeps: {
				include: []
			},
			plugins:[isoImport()]
		}
	}
};

export default config;
