<script>
	const isBrowser = typeof window !== 'undefined';

	// Initial theme setup based on localStorage or system preference
	let theme = isBrowser ? localStorage.getItem('theme') || 'light' : 'light';
	$: darkMode = theme === 'dark';

	// Update localStorage and toggle the theme class on the document
	function applyTheme() {
		if (theme === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// Toggle the theme and save it in localStorage
	function toggleTheme() {
		theme = darkMode ? 'light' : 'dark';  // Toggle theme based on darkMode
		localStorage.setItem('theme', theme);
		applyTheme();
	}

	// Apply the theme on mount
	if (isBrowser) {
		applyTheme();
	}
</script>

<label class="inline-flex cursor-pointer items-center mt-3 pr-10">
	<input
		type="checkbox"
		bind:checked={darkMode}
		on:click={toggleTheme}
		class="peer sr-only"
	/>
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-800"
	></div>
</label>
