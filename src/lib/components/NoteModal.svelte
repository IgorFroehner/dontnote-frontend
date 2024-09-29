<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addNote, updateNote } from '$lib/stores/NotesStore';
	import type { Note } from '$lib/types/note';

	export let note: Note = {
		id: undefined,
		title: '',
		content: ''
	};

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	function createNote() {
		if (note.id === undefined) {
			addNote(note);
		} else {
			updateNote(note)
		}
		modalStore.close();
	}

	onMount(() => {
		if ($modalStore[0] && $modalStore[0].meta.note) {
			note = $modalStore[0].meta.note;
		}
	});
</script>

{#if $modalStore[0]}
	<div class="backdrop"></div>
	<dialog open class="w-1/2 border-gray-300 bg-white dark:bg-gray-800">
		<div class="modal-content bg-white dark:bg-gray-800">
			<h2 class="text-lg font-bold dark:text-white">Create New Note</h2>

			<form on:submit|preventDefault={createNote}>
				<label for="note-title" class="mt-2 block font-semibold dark:text-white">Title</label>
				<input
					id="note-title"
					type="text"
					bind:value={note.title}
					class="block w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
					placeholder="Enter note title"
					required
				/>

				<label for="note-content" class="mt-4 block font-semibold dark:text-white">Content</label>
				<textarea
					id="note-content"
					bind:value={note.content}
					class="block h-96 w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
					placeholder="Enter note content"
					required
				></textarea>

				<div class="mt-4 flex justify-end gap-2">
					<button
						type="button"
						on:click={() => modalStore.close()}
						class="rounded-lg bg-gray-300 px-4 py-2 text-black"
					>
						Cancel
					</button>
					<button type="submit" class="rounded-lg bg-blue-500 px-4 py-2 text-white">
						{#if note.id}Update Note{:else}Create Note{/if}
					</button>
				</div>
			</form>
		</div>
	</dialog>
{/if}

<style>
	:global(.carta-font-code) {
		font-family: 'SansSerif', monospace;
		font-size: 1.1rem;
		min-height: 80%;
	}
	dialog {
		border: none;
		padding: 1rem;
		border-radius: 8px;
		width: 100%;
		max-width: 80%;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}
	.backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	button {
		margin-top: 10px;
	}
</style>
