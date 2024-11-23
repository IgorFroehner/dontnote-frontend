<script lang="ts">
import Button from '$lib/components/Button.svelte';
import { verifyUserRequest } from '$lib/api/api-service';
import { getToastStore } from '@skeletonlabs/skeleton';

let toastStore = getToastStore();

type Props = {
	userSignupInfo: {
		email: string,
		uuid: string,
	}
	successCallback?: () => void
};

let { userSignupInfo, successCallback }: Props = $props();

let { email, uuid } = userSignupInfo;

let verificationCode = $state('');
let loading = $state(false);
let error = $state('');

const handleVerify = async (e: Event) => {
	loading = true;
	e.preventDefault();

	if (!verificationCode) {
		error = 'Please fill in the verification code.';
		loading = false;
		return;
	}

	const response = await verifyUserRequest('users/verify_email', {
		user_uuid: uuid,
		verification_code: verificationCode
	});

	if (response.ok) {
		toastStore.trigger({
			message: 'Email verified successfully! You can now sign in.',
			timeout: 2000,
			background: 'bg-green-500'
		});
		loading = false;
		successCallback?.();
		return;
	}

	if (response.status === 400) {
		const errorResponse = await response.json();
		error = errorResponse.message;
	} else {
		error = 'Something went wrong while verifying your email.';
	}
	loading = false;
};
</script>

<p class="mb-4 text-center">
	We've sent a verification code to the email {email}, <br />
	please enter that code here to confirm that it's yours.
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
