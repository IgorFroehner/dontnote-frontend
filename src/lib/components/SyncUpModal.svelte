<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { loadNotesFromLocalStorage } from '$lib/services/notes-service';
	import { postRequest } from '$lib/api/api-service';
	import Button from '$lib/components/Button.svelte';
	import { notesStore } from '$lib/stores/NotesStore';
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let loading = $state(false);

	const eraseLocalNotes = () => {
		localStorage.setItem('notes', '[]');
	};

	const onConfirm = async () => {
		loading = true;
		const localNotes = loadNotesFromLocalStorage();
		if (localNotes.length > 0) {
			try {
				await postRequest('notes/batch_create', localNotes);

				notesStore.update((notes) => [...notes, ...localNotes]);
				eraseLocalNotes();
				toastStore.trigger({
					message: 'Local notes pushed successfully',
					timeout: 2000,
					background: 'bg-green-500'
				});
			} catch {
				toastStore.trigger({
					message: 'Something went wrong while pushing local notes',
					timeout: 5000,
					classes: 'bg-red-500'
				});
			}
		}

		modalStore.close();
	};

	const onNegative = () => {
		eraseLocalNotes();
		modalStore.close();
	};
</script>

{#if $modalStore[0]}
	<div class="backdrop"></div>
	<dialog open class="w-1/3 border-gray-300 bg-white dark:bg-gray-900">
		<div class="modal-content bg-white dark:bg-gray-900">
			<h2 class="text-lg font-bold dark:text-white">Push local notes?</h2>

			<p class="mt-2 dark:text-white">
				You have some notes stored locally, would you want to push them and store them in the cloud?
				If you don't do it, local notes will be lost.
			</p>

			<div class="mt-4 flex justify-end gap-2">
				<Button onClick={onNegative}>No</Button>
				<Button variant="secondary" onClick={onConfirm} {loading}>Yes</Button>
			</div>
		</div>
	</dialog>
{/if}

<style>
	dialog {
		border: none;
		padding: 1rem;
		border-radius: 8px;
		width: 100%;
		max-width: 33%;
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
