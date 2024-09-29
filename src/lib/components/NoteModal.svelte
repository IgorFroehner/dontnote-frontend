<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addNote } from '$lib/stores/NotesStore';

	export let note = {
		title: '',
		content: ''
	};

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	function createNote() {
		addNote({
			title: note.title,
			content: note.content
		});

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
	<dialog open class="w-1/2">
		<div class="modal-content">
			<h2 class="text-lg font-bold">Create New Note</h2>

			<form on:submit|preventDefault={createNote}>
				<label for="note-title" class="block font-semibold mt-2">Title</label>
				<input
					id="note-title"
					type="text"
					bind:value={note.title}
					class="block w-full p-2 border rounded-md"
					placeholder="Enter note title"
					required
				/>

				<label for="note-content" class="block font-semibold mt-4">Content</label>
				<textarea
					id="note-content"
					bind:value={note.content}
					class="block w-full h-96 p-2 border rounded-md"
					placeholder="Enter note content"
					required
				></textarea>

				<!-- Modal buttons -->
				<div class="mt-4 flex justify-end gap-2">
					<button
						type="button"
						on:click={() => modalStore.close()}
						class="bg-gray-300 text-black py-2 px-4 rounded-lg"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="bg-blue-500 text-white py-2 px-4 rounded-lg"
					>
						Create Note
					</button>
				</div>
			</form>
		</div>
	</dialog>
{/if}

<style>
  dialog {
    border: none;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    width: 100%;
		max-width: 80%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .backdrop {
    background-color: rgba(0, 0, 0, 0.7);
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
