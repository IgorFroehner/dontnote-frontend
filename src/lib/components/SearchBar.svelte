<script lang="ts">
	interface Props {
		search?: string;
	}

	let { search = $bindable('') }: Props = $props();
</script>

<div class="relative mt-3 w-2/3">
	<input
		type="text"
		class="h-12 w-full rounded-lg bg-gray-200 pl-3 pr-12 text-2xl font-medium opacity-80 focus:outline-none"
		placeholder="Search..."
		bind:value={search}
	/>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		width="24"
		viewBox="0 0 512 512"
		class="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
	>
		<path
			d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
		/>
	</svg>
</div>
