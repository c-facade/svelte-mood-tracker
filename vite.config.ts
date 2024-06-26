import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			devOptions: {
				enabled: true
			},
			registerType: 'autoUpdate',
			// cache all the imports
			workbox: {
				globPatterns: ["**/*"],
			},
			// use something to cache all the static assets?
			includeAssets: ['favicon.svg', 'smui.css'],
			manifest: {
				name: 'Mood Tracker',
				short_name: 'MoodTracker',
        description: 'Track your mood',
				theme_color: '#009688',
				background_color: 'black',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg'
					},
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
