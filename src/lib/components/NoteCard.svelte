<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Note } from '$lib/types/note';

	const modalStore = getModalStore();

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
	let title = $derived(note.title.length > 20 ? note.title.slice(0, 63) + '...' : note.title);
	let content = $derived(note.content.length > 500 ? note.content.slice(0, 500) + '...' : note.content);

	const openModal = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'noteModal',
			meta: {
				note: { ...note },
				mode: 'show'
			}
		};
		modalStore.trigger(modal);
	};
</script>

<div
	onclick={openModal}
	onkeyup={openModal}
	role="button"
	tabindex="0"
	class="mb-4 w-fit max-w-96 cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800 dark:shadow-md dark:shadow-gray-800 dark:hover:shadow-lg dark:hover:shadow-gray-800"
>
	<h2 class="mb-2 flex-grow text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
	<p class="text-gray-600 dark:text-gray-300">{content}</p>
</div>
