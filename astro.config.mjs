// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://ctr.0xninja.fr',
	integrations: [
		starlight({
			title: 'CTR Speedrun Docs',
			favicon: '/favicon.ico',
			editLink: {
				baseUrl: 'https://github.com/OxNinja/ctr-docs/edit/main/',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/OxNinja/ctr-docs' }],
			// sidebar: [
			// 	{
			// 		label: 'Guides',
			// 		items: [
			// 			// Each item here is one entry in the navigation menu.
			// 			{ label: 'Example Guide', slug: 'guides/example' },
			// 		],
			// 	},
			// 	{
			// 		label: 'Reference',
			// 		items: [{ autogenerate: { directory: 'reference' } }],
			// 	},
			// ],
		}),
	],
});
