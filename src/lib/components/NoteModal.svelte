<script lang="ts">
	import { onDestroy, onMount, type SvelteComponent } from 'svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { addNote, removeNote, updateNote } from '$lib/stores/NotesStore';
	import type { Note } from '$lib/types/note';
	import Button from '$lib/components/Button.svelte';

	interface Props {
		note?: Note;
		mode?: 'editor' | 'show';
		parent: SvelteComponent;
	}

	let {
		note = $bindable({
			id: undefined,
			title: '',
			content: ''
		}),
		mode = $bindable('editor'),
		parent
	}: Props = $props();

	const modalStore = getModalStore();

	function createNote() {
		if (note.uuid === undefined) {
			addNote(note);
		} else {
			updateNote(note);
		}
		close();
	}

	onMount(() => {
		document.body.classList.add('overflow-hidden');
		if ($modalStore[0] && $modalStore[0].meta.note) {
			note = $modalStore[0].meta.note;
		}
		if ($modalStore[0] && $modalStore[0].meta.mode) {
			mode = $modalStore[0].meta.mode;
		}
	});

	const deleteNote = () => {
		const confirmDeletionModal: ModalSettings = {
			type: 'component',
			component: 'confirmModal',
			response: (confirmed: boolean) => {
				if (confirmed) {
					removeNote(note);
				}
			}
		};
		close();
		modalStore.trigger(confirmDeletionModal);
	};

	const close = () => {
		modalStore.close();
	};

	onDestroy(() => {
		document.body.classList.remove('overflow-hidden');
	});
	let editing = $derived(note.uuid !== undefined);
</script>

{#if $modalStore[0]}
	<div class="backdrop"></div>
	<div class="dialog relative rounded-lg border border-gray-300 bg-white dark:bg-gray-800">
		<button
			class="close-button text-xl font-bold text-gray-900 outline-none hover:text-gray-600 focus:outline-none focus-visible:ring-0 dark:text-gray-400 dark:hover:text-gray-500"
			onclick={() => modalStore.close()}
		>
			&times;
		</button>

		<div class="modal-content bg-white outline-none dark:bg-gray-800">
			{#if mode === 'editor'}
				<h2 class="text-lg font-bold dark:text-white">
					{#if editing}Edit Note{:else}Create New Note{/if}
				</h2>

				<form onsubmit={e => {e.preventDefault(); createNote()}}>
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
						class="mb-2 block h-96 w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
						placeholder="Enter note content"
						required
					></textarea>

					<div class="mb-2 flex justify-end gap-2">
						<Button
							type="button"
							variant="secondary"
							size="large"
							onClick={() => (editing ? (mode = 'show') : modalStore.close())}
						>
							Cancel
						</Button>
						<Button type="submit" variant="primary" size="large">
							{#if editing}Save{:else}Create{/if}
						</Button>
					</div>
				</form>
			{:else if mode === 'show'}
				<div class="flex items-center justify-between pb-4">
					<h2 class="text-2xl font-bold dark:text-white">{note.title}</h2>
					<div class="mx-2 flex gap-3">
						<button onclick={() => (mode = 'editor')}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="fill-current text-gray-800 dark:text-gray-100"
								height="18"
								width="18"
								viewBox="0 0 512 512"
								><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
								/></svg
							>
						</button>
						<button onclick={deleteNote}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="fill-current text-gray-800 dark:text-gray-100"
								height="17"
								width="18"
								viewBox="0 0 448 512"
								><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
								/></svg
							>
						</button>
					</div>
				</div>
				<div class="note-content-show overflow-y-auto">
					<p class="mt-2 whitespace-pre-wrap dark:text-gray-200">{note.content}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.note-content-show {
		max-height: 500px;
	}
	.close-button {
		position: absolute;
		top: -2.5rem;
		right: -1.5rem;
		outline: none;
		border: none;
	}
	.dialog {
		padding: 1rem;
		width: 100%;
		max-width: 60%;
		max-height: 600px;
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
</style>
