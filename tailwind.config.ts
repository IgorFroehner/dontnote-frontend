import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],

	theme: {
		extend: {}
	},

	darkMode: 'selector',

	plugins: [require('@tailwindcss/typography'), skeleton({
		themes: { preset: [ "wintry" ] }
	})]
} as Config;
