<script lang="ts">
	import '../app.css';

	initializeStores();

	import NoteModal from '$lib/components/NoteModal.svelte';
	import { initializeStores, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import SyncUpModal from '$lib/components/SyncUpModal.svelte';
	import UserProfileModal from '$lib/components/UserProfileModal.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const modalRegistry: Record<string, ModalComponent> = {
		noteModal: { ref: NoteModal },
		confirmModal: { ref: ConfirmModal },
		syncUpModal: { ref: SyncUpModal },
		userProfileModal: { ref: UserProfileModal }
	};
</script>

<main class="flex min-h-screen flex-col bg-white dark:bg-black">
	{@render children?.()}
</main>

<Modal components={modalRegistry} />
<Toast />
