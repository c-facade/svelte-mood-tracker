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
			// cache all the imports
			workbox: {
				globPatterns: ["**/*"],
			},
			includeAssets: ["**/*"],
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
