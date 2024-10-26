<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
</script>

<!-- Plus Button -->
<button
	class="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-gray-600 text-white shadow-lg transition-colors hover:bg-gray-700"
	onclick={bubble('click')}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		width="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<line x1="12" y1="2" x2="12" y2="22" style="stroke-width: 4"></line>
		<line x1="2" y1="12" x2="24" y2="12" style="stroke-width: 4"></line>
	</svg>
</button>
