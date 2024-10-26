<script lang="ts">
	import { postRequest } from '$lib/api/api-service';
	import { authStore } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import { redirect } from '@sveltejs/kit';

	let userIdentifier = '';
	let password = '';

	if (get(authStore) !== null) {
		redirect(300, '/');
	}

	const signIn = async () => {
		const response = await postRequest('http://localhost:8080/api/users/sign_in', {
			user_identifier: userIdentifier,
			password
		});

		console.log(response);
	};
</script>

<div class="flex flex-col justify-center items-center h-screen dark:text-white">
	<h1 class="logo-text pb-3 pt-5 mb-5 dark:text-gray-200"><a href="/">DontNote</a></h1>

	<form on:submit|preventDefault={signIn}>
		<label for="note-title" class="mt-2 block font-semibold pb-1 dark:text-white">Email or Username</label>
		<input
			id="note-title"
			type="text"
			bind:value={userIdentifier}
			class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
			required
		/>

		<label for="password" class="mt-4 block font-semibold pb-1 dark:text-white">Password</label>
		<input
			id="password"
			bind:value={password}
			type="password"
			class="block w-80 rounded-md border p-2 dark:bg-gray-700 dark:text-white"
			required
		>

		<div class="flex justify-end gap-2 mt-4 pb-5">
			<button type="submit" class="rounded-lg bg-gray-600 px-4 py-1 text-white">
				Sing In
			</button>
		</div>
	</form>
</div>

<style>
  .logo-text {
    font-size: 2.5em;
    font-weight: bold;
  }
</style>