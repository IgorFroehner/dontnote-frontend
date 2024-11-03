<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore, clearAuthInfo } from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { isBackedEnabled } from '$lib/services/features-service';

	const toastStore = getToastStore();

	if (get(authStore) === null || !isBackedEnabled) {
		goto('/');
	}

	toastStore.trigger({
		message: 'Sign off successful',
		timeout: 2000,
		background: 'bg-green-500'
	});

	clearAuthInfo();
	goto('/');
</script>
