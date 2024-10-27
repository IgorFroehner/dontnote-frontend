import { type Writable, writable } from 'svelte/store';
import type { AuthInfo } from '$lib/types/user';

export const authStore: Writable<null | AuthInfo> = writable(null, () => {
	const storedAuthInfo = localStorage.getItem('authInfo');
	if (storedAuthInfo) {
		authStore.set(JSON.parse(storedAuthInfo) as AuthInfo);
	}

	return () => {};
});

export const setAuthInfo = (authInfo: AuthInfo) => {
	localStorage.setItem('authInfo', JSON.stringify(authInfo));
	authStore.set(authInfo);
};

export const clearAuthInfo = () => {
	localStorage.removeItem('authInfo');
	authStore.set(null);
};
