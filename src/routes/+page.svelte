<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CreateNoteButton from '$lib/components/CreateNoteButton.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { authInfo } from '$lib/stores/AuthStore';
	import { notesStore } from '$lib/stores/NotesStore';

	const modalStore = getModalStore();

	type Note = {
		title: string;
		content: string;
	};

	let notes: Note[] = [];

	notesStore.subscribe((notesStored) => {
		notes = notesStored;
	});

	authInfo.subscribe((info) => {
		if (!info) {
			return notesStore;
		}
		// Fetch cards from the server
	});

	const openModal = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'noteModal',
			meta: {}
		};
		modalStore.trigger(modal)
	};
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
		{#each notes as note}
			<Card title={note.title} content={note.content} />
		{/each}
	</div>
</div>

<CreateNoteButton on:click={openModal}/>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
