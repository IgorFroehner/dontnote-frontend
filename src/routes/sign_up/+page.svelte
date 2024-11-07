<script lang="ts">
	import { authStore } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { signUpRequest, verifyUserRequest } from '$lib/api/api-service';

	const toastStore = getToastStore();

	let loading = $state(false);
	let error = $state('');

	let step = $state(0);

	let email = $state('');
	let username = $state('');
	let password = $state('');
	let passwordConfirmation = $state('');
	let verificationCode = $state('');
	let signUpResponse = $state(null);

	if (get(authStore) !== null) {
		goto('/');
	}

	const handleSignUp = async (e: Event) => {
		loading = true;
		e.preventDefault();

		if (!email || !username || !password || !passwordConfirmation) {
			error = 'Please fill in all fields.';
			loading = false;
			return;
		}

		if (username.length < 4) {
			error = 'Username must contain at least 4 characters.';
			loading = false;
			return;
		}

		if (password !== passwordConfirmation) {
			error = 'Passwords do not match.';
			loading = false;
			return;
		}

		if (password.length < 8) {
			error = 'Password must contain at least 8 characters.';
			loading = false;
			return;
		}
		error = '';

		const response = await signUpRequest('users/sign_up', {
			email,
			username,
			password
		});

		if (response.ok) {
			toastStore.trigger({
				message: "Sign up successful! Now let's verify your email.",
				timeout: 2000,
				background: 'bg-green-500'
			});
			step = 1;
			signUpResponse = await response.json();
			loading = false;
			return;
		}

		if (response.status === 400) {
			const errorResponse = await response.json();
			error = errorResponse.message;
		} else {
			error = 'Something went wrong while signing up.';
		}

		loading = false;
	};

	const handleVerify = async (e: Event) => {
		loading = true;
		e.preventDefault();

		if (!verificationCode) {
			error = 'Please fill in the verification code.';
			loading = false;
			return;
		}

		const response = await verifyUserRequest('users/verify_email', {
			user_uuid: signUpResponse?.uuid,
			verification_code: verificationCode
		});

		if (response.ok) {
			toastStore.trigger({
				message: 'Email verified successfully! You can now sign in.',
				timeout: 2000,
				background: 'bg-green-500'
			});
			loading = false;
			await goto('/sign_in');
			return;
		}

		if (response.status === 400) {
			const errorResponse = await response.json();
			error = errorResponse.message;
		} else {
			error = 'Something went wrong while verifying your email.';
		}
	};
</script>

<div class="flex h-screen flex-col items-center justify-center dark:text-white">
	<p class="pb-4">👋 Welcome to</p>
	<h1 class="logo-text pb-4 dark:text-gray-200"><a href="/">DontNote!</a></h1>

	{#if step === 0}
		<p class="mb-4 text-center">
			We're happy to have you here,<br />fill in your details to sign up 📝.
		</p>

		<form onsubmit={handleSignUp}>
			<label for="email" class="mt-4 block pb-1 font-semibold dark:text-white">
				Your Best Email
			</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
				required
			/>

			<label for="username" class="mt-4 block pb-1 font-semibold dark:text-white"> Username </label>
			<input
				id="username"
				type="text"
				bind:value={username}
				class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
				required
			/>

			<label for="password" class="mt-4 block pb-1 font-semibold dark:text-white">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
				required
			/>

			<label for="password-confirmation" class="mt-4 block pb-1 font-semibold dark:text-white"
				>Password Confirmation</label
			>
			<input
				id="password-confirmation"
				type="password"
				bind:value={passwordConfirmation}
				class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
				required
			/>

			{#if error}
				<p class="mt-2 text-center text-red-500">
					{error}
				</p>
			{/if}

			<div class="mb-4 mt-4 flex justify-end gap-5">
				<Button type="submit" {loading}>Sign Up</Button>
			</div>
		</form>
	{/if}
	{#if step === 1}
		<p class="mb-4 text-center">
			We've sent a verification code to the email {email}, <br />
			please enter it below to confirm that it's yours.
		</p>

		<form onsubmit={handleVerify}>
			<label for="verify-code" class="mt-4 block pb-1 font-semibold dark:text-white">
				Verification Code
			</label>
			<input
				id="verify-code"
				type="text"
				bind:value={verificationCode}
				class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
				required
			/>

			{#if error}
				<p class="mt-2 text-center text-red-500">
					{error}
				</p>
			{/if}

			<div class="mb-4 mt-4 flex justify-end gap-5">
				<Button type="submit" {loading}>Verify</Button>
			</div>
		</form>
	{/if}
</div>

<style>
	.logo-text {
		font-size: 2.5em;
		font-weight: bold;
	}
</style>
