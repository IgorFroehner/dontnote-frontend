<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore, clearAuthInfo } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	if (get(authStore) === null) {
		goto('/');
	}

	clearAuthInfo();
	goto('/');

	toastStore.trigger({
		message: 'Sign off successful',
		timeout: 1000
	});
</script>
