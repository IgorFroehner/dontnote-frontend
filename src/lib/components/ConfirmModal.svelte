<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export const title = 'Delete Note';
	export const body = 'Are you sure you want to delete this note?';

	const onConfirm = () => {
		if ($modalStore[0]?.response) {
			$modalStore[0].response(true);
		}
		modalStore.close();
	}

	const onCancel = () => {
		if ($modalStore[0]?.response) {
			$modalStore[0].response(false);
		}
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="backdrop"></div>
	<dialog open class="w-1/3 border-gray-300 bg-white dark:bg-gray-800">
		<div class="modal-content bg-white dark:bg-gray-800">
			<h2 class="text-lg font-bold dark:text-white">{title}</h2>

			<p class="mt-2 dark:text-white">{body}</p>

			<div class="mt-4 flex justify-end gap-2">
				<button on:click={onCancel} class="bg-gray-300 text-black px-4 py-2 rounded-lg">No</button>
				<button on:click={onConfirm} class="bg-red-500 text-white px-4 py-2 rounded-lg">Yes</button>
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
