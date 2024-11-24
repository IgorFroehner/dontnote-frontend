<script lang="ts">
	import { onDestroy, type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Note } from '$lib/types/note';
	import { get } from 'svelte/store';
	import { authStore } from '$lib/stores/AuthStore';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	const userInfo = get(authStore)?.user;

	const close = () => {
		modalStore.close();
	};

	if (!userInfo) {
		close();
	}

	interface Props {
		note?: Note;
		mode?: 'editor' | 'show';
		parent: SvelteComponent;
	}

	let { parent }: Props = $props();

	const modalStore = getModalStore();

	const signOff = () => {
		goto('/sign_off');
		close();
	};

	onDestroy(() => {
		document.body.classList.remove('overflow-hidden');
	});
</script>

{#if $modalStore[0]}
	<div class="backdrop"></div>
	<div class="dialog relative rounded-lg border border-gray-300 bg-white dark:bg-gray-900">
		<button
			class="close-button text-xl font-bold text-gray-900 outline-none hover:text-gray-600 focus:outline-none focus-visible:ring-0 dark:text-gray-400 dark:hover:text-gray-500"
			onclick={close}
		>
			&times;
		</button>

		<div class="text-center">
			<div class="mb-4 flex items-center justify-center">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 text-2xl text-gray-600 dark:bg-gray-700 dark:text-gray-400"
				>
					{userInfo.username.charAt(0).toUpperCase()}
				</div>
			</div>

			<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-200">{userInfo.username}</h1>

			<p class="text-gray-600 dark:text-gray-400">{userInfo.email}</p>
		</div>

		<div class="modal-content mt-6 flex flex-col items-center">
			<Button onClick={signOff}>Sign Off</Button>
		</div>

		<div class="modal-content bg-white outline-none dark:bg-gray-900"></div>
	</div>
{/if}

<style>
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
		max-width: 30%;
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
