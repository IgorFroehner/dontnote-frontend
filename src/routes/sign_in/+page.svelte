<script lang="ts">
	import { signInRequest } from '$lib/api/api-service';
	import { authStore, setAuthInfo } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { AuthInfo } from '$lib/types/user';

	let userIdentifier = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	const toastStore = getToastStore();

	if (get(authStore) !== null) {
		goto('/');
	}

	const signIn = async () => {
		loading = true;
		const response = await signInRequest('users/sign_in', {
			user_identifier: userIdentifier,
			password
		})

		if (response.ok) {
			const authInfo = await response.json() as AuthInfo;

			toastStore.trigger({
				message: 'Sign in successful',
				timeout: 2000,
				background: 'bg-green-500'
			});
			setAuthInfo(authInfo);
			await goto('/');
			return;
		}

		error = 'Invalid email or password';
		toastStore.trigger({
			message: 'Sign in failed',
			timeout: 2000,
			classes: 'bg-red-500'
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

		{#if error}
			<p class="text-center text-red-500 mt-2">
				{error}
			</p>
		{/if}

		<div class="mt-4 flex justify-end gap-5 mb-4">
			<Button type="submit" {loading}>Sign In</Button>
		</div>

		<p class="text-center">
			<strong>Dont</strong> have an account?
			<a href="/sign_up" class="underline hover:text-blue-600">Sign Up</a>
		</p>
	</form>
</div>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
