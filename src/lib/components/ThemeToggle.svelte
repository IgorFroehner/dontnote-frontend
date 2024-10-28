<script>
	const isBrowser = typeof window !== 'undefined';

	let theme = $state(isBrowser ? localStorage.getItem('theme') || 'light' : 'light');
	let darkMode = $derived(theme === 'dark');

	function applyTheme() {
		if (
			theme === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function toggleTheme() {
		theme = darkMode ? 'light' : 'dark'; // Toggle theme based on darkMode
		localStorage.setItem('theme', theme);
		applyTheme();
	}

	if (isBrowser) {
		applyTheme();
	}
</script>

<label class="mt-3 inline-flex cursor-pointer items-center">
	<input type="checkbox" checked={darkMode} onclick={toggleTheme} class="peer sr-only" />
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-800"
	></div>
</label>
