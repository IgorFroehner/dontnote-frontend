import { authStore, clearAuthInfo } from '$lib/stores/AuthStore';
import { get } from 'svelte/store';

const { VITE_API_URL: API_URL } = import.meta.env;

export const getRequest = async (endpoint: string) => {
	const authInfo = get(authStore);
	if (authInfo === null) {
		throw 'No token found';
	}

	const response = await fetch(`${API_URL}/${endpoint}`, {
		headers: {
			'Authorization': `Bearer ${authInfo.token}`
		}
	});

	if (response.status === 401) {
		clearAuthInfo();
		throw 'Unauthorized';
	}
	return response.json();
}

export const postRequest = async (endpoint: string, data: any) => {
	const response = await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return response.json();
}
