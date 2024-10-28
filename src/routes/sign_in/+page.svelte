<script lang="ts">
	import { postRequest } from '$lib/api/api-service';
	import { authStore, setAuthInfo } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let userIdentifier = $state('');
	let password = $state('');
	let loading = $state(false);

	const toastStore = getToastStore();

	if (get(authStore) !== null) {
		goto('/');
	}

	const signIn = async () => {
		loading = true;
		await postRequest('users/sign_in', {
			user_identifier: userIdentifier,
			password
		})
			.then((response) => {
				toastStore.trigger({
					message: 'Sign in successful',
					timeout: 1000
				});
				setAuthInfo(response);
				goto('/');
			})
			.catch((error) => {
				console.error(error);

				toastStore.trigger({
					message: 'Sign in failed',
					timeout: 1000
				});
			});

		loading = false;
	};
</script>

<div class="flex h-screen flex-col items-center justify-center dark:text-white">
	<h1 class="logo-text mb-5 pb-3 pt-5 dark:text-gray-200"><a href="/">DontNote</a></h1>

	<form onsubmit={signIn}>
		<label for="note-title" class="mt-2 block pb-1 font-semibold dark:text-white"
			>Email or Username</label
		>
		<input
			id="note-title"
			type="text"
			bind:value={userIdentifier}
			class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
			required
		/>

		<label for="password" class="mt-4 block pb-1 font-semibold dark:text-white">Password</label>
		<input
			id="password"
			bind:value={password}
			type="password"
			class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
			required
		/>

		<div class="mt-4 flex justify-end gap-2 pb-5">
			<Button type="submit" {loading}>Sign In</Button>
		</div>
	</form>
</div>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
