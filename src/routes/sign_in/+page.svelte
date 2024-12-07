<script lang="ts">
	import { askForVerificationRequest, signInRequest } from '$lib/api/api-service';
	import { authStore, setAuthInfo } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { AuthInfo } from '$lib/types/user';
	import { loadNotesFromLocalStorage } from '$lib/services/notes-service';
	import { isBackedEnabled } from '$lib/services/features-service';
	import VerifyUserSignupStep from '$lib/components/sign_up/VerifyUserSignupStep.svelte';

	let step = $state(0);
	let userIdentifier = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	let userSignupInfo = $state(null);

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	if (get(authStore) !== null || !isBackedEnabled) {
		goto('/');
	}

	const signIn = async () => {
		loading = true;

		try {
			const response = await signInRequest('users/sign_in', {
				user_identifier: userIdentifier,
				password
			});

			if (response.ok) {
				const authInfo = (await response.json()) as AuthInfo;

				toastStore.trigger({
					message: 'Sign in successful',
					timeout: 2000,
					background: 'bg-green-500'
				});
				setAuthInfo(authInfo);

				if (loadNotesFromLocalStorage().length > 0) {
					const syncUpModal: ModalSettings = {
						type: 'component',
						component: 'syncUpModal',
						meta: {}
					};
					modalStore.trigger(syncUpModal);
				}

				loading = false;
				await goto('/');
				return;
			}

			if (response.status === 403) {
				userSignupInfo = (await response.json()).user;

				askForVerificationRequest('users/ask_for_verification', {
					user_uuid: userSignupInfo?.uuid
				});

				step = 1;
				loading = false;
				return;
			}
		} catch {
			toastStore.trigger({
				message: 'Something went wrong while signing in.',
				timeout: 5000,
				classes: 'bg-red-500'
			});
			loading = false;
			return;
		}

		error = 'Invalid email or password';
		toastStore.trigger({
			message: 'Sign in failed',
			timeout: 5000,
			classes: 'bg-red-500'
		});

		loading = false;
	};
</script>

<div class="flex h-screen flex-col items-center justify-center dark:text-white">
	<h1 class="logo-text mb-5 pb-3 pt-5 dark:text-gray-200"><a href="/">DontNote</a></h1>
	{#if step === 0}
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
				<p class="mt-2 text-center text-red-500">
					{error}
				</p>
			{/if}

			<div class="mb-4 mt-4 flex justify-end gap-5">
				<Button type="submit" {loading}>Sign In</Button>
			</div>

			<p class="text-center">
				<strong>Dont</strong> have an account?
				<a href="/sign_up" class="underline hover:text-blue-600">Sign Up</a>
			</p>
		</form>
	{/if}
	{#if step === 1 && userSignupInfo}
		<p class="mb-5 text-center">
			You didn't had the chance to verify your email yet, <br />
			but it's required to sign in. Let's do it now:
		</p>
		<VerifyUserSignupStep
			{userSignupInfo}
			successCallback={() => {
				step = 0;
				password = '';
				userIdentifier = '';
			}}
		/>
	{/if}
</div>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
