<script lang="ts">
	import NoteCard from '$lib/components/NoteCard.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CreateNoteButton from '$lib/components/CreateNoteButton.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { notesStore } from '$lib/stores/NotesStore';
	import type { Note } from '$lib/types/note';
	import Fuse from 'fuse.js';

	const modalStore = getModalStore();

	let notes: Note[] = [];
	let search = '';

	notesStore.subscribe((notesStored) => {
		notes = notesStored;
	});

	const openModal = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'noteModal',
			meta: {}
		};
		modalStore.trigger(modal);
	};

	const fuseOptions = {
		keys: [
			{ name: 'title', weight: 0.7 },
			{ name: 'content', weight: 0.3 }
		]
	};

	$: {
		if (search) {
			const fuse = new Fuse(notes, fuseOptions);

			notes = fuse.search(search).map((result) => result.item);
		} else {
			notesStore.subscribe((notesStored) => {
				notes = notesStored;
			});
		}
	}
</script>

<header>
	<nav class="bg-white px-4 dark:bg-gray-950" aria-label="Page navigation">
		<div class="flex items-center justify-between">
			<h1 class="logo-text pb-3 pl-5 pt-5 dark:text-gray-200"><a href="/">DontNote</a></h1>

			<SearchBar bind:search />

			<ThemeToggle />

			<a href="/sign_in">
				<button type="button" class="mt-3 rounded-lg bg-gray-300 px-4 py-2 font-bold text-black">
					Sing In
				</button>
			</a>
		</div>
	</nav>
</header>

<div class="container mx-auto mt-5 min-h-full dark:bg-gray-950">
	<div class="border-black-200 container flex flex-wrap items-start gap-4 rounded-md p-4">
		{#each notes as note}
			<NoteCard note={note} />
		{/each}
	</div>
</div>

<CreateNoteButton on:click={openModal} />

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
