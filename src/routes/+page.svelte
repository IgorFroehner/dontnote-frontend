<script lang="ts">
	import NoteCard from '$lib/components/NoteCard.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CreateNoteButton from '$lib/components/CreateNoteButton.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { notesStore } from '$lib/stores/NotesStore';
	import { authStore } from '$lib/stores/AuthStore';
	import { loadNotes, searchNotes } from '$lib/services/notes-service';
	import Button from '$lib/components/Button.svelte';
	import type { Note } from '$lib/types/note';
	import { isBackedEnabled } from '$lib/services/features-service';

	const modalStore = getModalStore();

	let search = $state('');

	const openModal = (note?: Note, mode?: 'editor' | 'show') => {
		mode = mode || 'editor';
		const modal: ModalSettings = {
			type: 'component',
			component: 'noteModal',
			meta: {
				note,
				mode
			}
		};
		modalStore.trigger(modal);
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if ($notesStore.length === 0) {
				openModal(
					{
						title: search,
						content: ''
					},
					'editor'
				);
				return;
			}
			openModal({ ...$notesStore[0] }, 'show');
		}
		if (search.length >= 100) {
			search = search.slice(0, 100);
		}
	};

	$effect(() => {
		if (search) {
			searchNotes(search).then((notes_result) => ($notesStore = notes_result));
		} else {
			loadNotes().then((notes_loaded) => ($notesStore = notes_loaded));
		}
	});
</script>

<header>
	<nav class="bg-white px-4 dark:bg-gray-950" aria-label="Page navigation">
		<div class="flex items-center justify-between gap-3">
			<h1 class="logo-text pb-3 pl-5 pt-5 dark:text-gray-200"><a href="/">DontNote</a></h1>

			<SearchBar bind:search {onkeydown} />

			<ThemeToggle />

			{#if isBackedEnabled}
				<div class="mt-3">
					{#if $authStore === null}
						<a href="/sign_in">
							<Button variant="primary" size="medium">Sing In</Button>
						</a>
					{:else}
						<a href="/sign_off">
							<Button variant="secondary" size="medium">Sign Off</Button>
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</nav>
</header>

<div class="container mx-auto mt-5 min-h-full dark:bg-gray-950">
	<div class="border-black-200 container flex flex-wrap items-start gap-4 rounded-md p-4">
		{#each $notesStore as note}
			<NoteCard {note} />
		{/each}
		{#if $notesStore.length === 0 && search === ''}
			<div class="flex h-96 w-screen flex-col items-center justify-center dark:text-white">
				<p class="mb-5 text-2xl font-bold text-gray-700 dark:text-gray-200">
					Your notes as you've never experienced.
				</p>

				<p class="text-lg text-gray-700 dark:text-gray-400">
					Start by creating a new note of something that you want to remember, or<br />
					that you want to be easily accessible. Later you can search them by title<br />
					using the search bar above.
				</p>
			</div>

			<div class="arrow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="arrow"
					data-name="arrow"
					height="200"
					width="400"
					viewBox="0 0 1013.06 561.69"
					><defs
						><style>
							.cls-1 {
								fill: red;
							}
						</style></defs
					><polygon
						class="cls-1"
						points="1013.06 400.2 811.43 309.66 875.14 427.9 861.39 561.69 1013.06 400.2"
					></polygon><path
						class="cls-1"
						d="M1205.36,728.52l-4.8.71-4.62.65-9.16,1.22q-9.13,1.17-18.24,2.23-18.21,2.11-36.39,3.82-36.37,3.42-72.79,5.5t-72.88,2.78q-36.47.72-73-.1A1420.86,1420.86,0,0,1,767.89,735c-48.35-6.11-96.49-15-143.59-28.42a675.77,675.77,0,0,1-69.5-23.86c-2.84-1.18-5.7-2.27-8.51-3.52l-8.43-3.71-4.21-1.85c-1.4-.63-2.78-1.32-4.17-2l-8.32-4c-2.79-1.28-5.49-2.77-8.23-4.15l-8.2-4.23-8.06-4.5c-2.67-1.52-5.39-2.94-8-4.58a399.59,399.59,0,0,1-59.94-43.09l-6.81-6.27c-2.25-2.1-4.56-4.15-6.68-6.38L408.76,588l-1.62-1.64c-.57-.58-1.16-1.24-1.7-1.83-1.08-1.2-2.11-2.39-3.14-3.59a281.26,281.26,0,0,1-21.77-30c-26.27-41.46-43.81-87.65-53.4-135.07A458.28,458.28,0,0,1,318.54,344,503,503,0,0,1,321,272a501,501,0,0,0,1.28,71.77,452.65,452.65,0,0,0,12.16,70.41l1.08,4.33,1.23,4.29,2.45,8.56,2.71,8.49,1.36,4.23c.47,1.41,1,2.8,1.48,4.2l3,8.37,3.25,8.27c1.05,2.77,2.23,5.49,3.4,8.21s2.27,5.46,3.55,8.13a368.09,368.09,0,0,0,35,61.28,264.29,264.29,0,0,0,21.93,27.13c1,1,2,2.06,2.94,3,.5.49.94.93,1.45,1.39l1.62,1.48,6.49,5.92c2.12,2,4.4,3.83,6.64,5.71l6.72,5.58a378.68,378.68,0,0,0,58.83,37.79c2.55,1.43,5.22,2.64,7.83,3.95l7.86,3.87,8,3.61c2.68,1.18,5.31,2.46,8,3.54l8.11,3.35c1.36.56,2.7,1.14,4.06,1.67l4.11,1.56,8.22,3.11c2.73,1,5.53,2,8.29,2.93a648.73,648.73,0,0,0,67.68,19.36c45.87,10.47,92.75,16.68,139.83,20.15a1376.31,1376.31,0,0,0,141.77,2.65q35.49-1.05,70.92-3.6t70.73-6.4q35.29-3.84,70.38-9,17.53-2.58,35-5.53c5.8-1,11.59-2,17.35-3l8.61-1.61,4.25-.83,4.06-.82Z"
						transform="translate(-318.17 -272)"
					></path></svg
				>
			</div>
		{:else if $notesStore.length === 0 && search !== ''}
			<div class="flex h-96 w-screen flex-col items-center justify-center dark:text-white">
				<p class="mb-5 text-2xl font-bold text-gray-700 dark:text-gray-200">No notes found.</p>

				<p class="text-lg text-gray-700 dark:text-gray-400">
					There are no notes with the title <span class="font-bold">"{search}"</span>.<br />
					Press enter to create a new note with this title.
				</p>
			</div>
		{/if}
	</div>
</div>

<CreateNoteButton onclick={() => openModal()} />

<footer class="mt-auto py-4 text-center">
	<p class="font-bold text-gray-400 dark:text-gray-400">
		Created with ❤️ by <a
			class="underline hover:text-blue-600"
			href="https://github.com/IgorFroehner"
			target="_blank">Igor Froehner</a
		>
	</p>
</footer>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
	.arrow {
		position: absolute;
		right: 100px;
		bottom: 50px;
		transform: rotate(10deg);
	}
</style>
