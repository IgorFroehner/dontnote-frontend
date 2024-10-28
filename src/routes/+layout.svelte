<script lang="ts">
	import '../app.css';

	initializeStores();

	import NoteModal from '$lib/components/NoteModal.svelte';
	import { initializeStores, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const modalRegistry: Record<string, ModalComponent> = {
		noteModal: { ref: NoteModal },
		confirmModal: { ref: ConfirmModal }
	};
</script>

<main class="flex min-h-screen flex-col bg-white dark:bg-gray-950">
	{@render children?.()}
</main>

<Modal components={modalRegistry} />
<Toast />
