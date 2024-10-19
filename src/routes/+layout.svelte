<script lang="ts">
	import '../app.css';

	initializeStores();

	import NoteModal from '$lib/components/NoteModal.svelte';
	import { initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		noteModal: { ref: NoteModal },
		confirmModal: { ref: ConfirmModal }
	};
</script>

<main class="bg-white dark:bg-gray-950 min-h-screen flex flex-col">
	<slot></slot>
</main>

<Modal components={modalRegistry}/>
