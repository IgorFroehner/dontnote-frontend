<script lang="ts">
	import '../app.css';

	initializeStores();

	import NoteModal from '$lib/components/NoteModal.svelte';
	import { initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';

	const modalRegistry: Record<string, ModalComponent> = {
		noteModal: { ref: NoteModal },
	};
</script>

<main class="bg-white dark:bg-gray-950">
	<slot></slot>
</main>

<Modal components={modalRegistry}/>
