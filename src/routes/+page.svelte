<script>
	import Card from '$lib/components/Card.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	const cards = [
		{
			title: 'First Note',
			content: 'This is the content of the first note.'
		},
		{
			title: 'Second Note',
			content: 'This is the content of the second note.'
		},
		{
			title: 'Third Note',
			content: 'This is the content of the third note.'
		},
		{
			title: 'Fourth Note',
			content: 'This is the content of the fourth note.'
		},
		{
			title: 'Fifth Note',
			content: 'Lorem ipsum adsf asdf asdf asdf asdf asdf as sadf'
		},
		{
			title: 'Sixth Note',
			content: 'Lorem ipsum adsf asdf asdf asdf asdf asdf as sadf'
		},
		{
			title: 'Seventh Note',
			content: 'Lorem ipsum adsf asdf asdf asdf asdf asdf as sadf'
		}
	];
</script>

<header>
	<nav class="bg-white px-4 dark:bg-gray-950" aria-label="Page navigation">
		<div class="flex items-center justify-between">
			<h1 class="logo-text pb-3 pl-5 pt-5 dark:text-gray-200"><a href="/">DontNote</a></h1>

			<SearchBar />

			<ThemeToggle />
		</div>
	</nav>
</header>

<div class="container mx-auto mt-5 min-h-full dark:bg-gray-950">
	<div class="border-black-200 container flex flex-wrap items-start gap-4 rounded-md p-4">
		{#each cards as card}
			<Card title={card.title} content={card.content} />
		{/each}
	</div>
</div>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
