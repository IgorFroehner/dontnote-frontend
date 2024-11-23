import { authStore, clearAuthInfo } from '$lib/stores/AuthStore';
import { get } from 'svelte/store';

const { VITE_API_URL: API_URL } = import.meta.env;

export async function getRequest(endpoint: string) {
	const authInfo = get(authStore);
	if (authInfo === null) {
		throw 'No token found';
	}

	const response = await fetch(`${API_URL}/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${authInfo.token}`
		}
	});

	if (response.status === 401) {
		clearAuthInfo();
		throw 'Unauthorized';
	}
	return response.json();
}

export async function postRequest(endpoint: string, body: any) {
	const authInfo = get(authStore);
	if (authInfo === null) {
		throw 'No token found';
	}

	const response = await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authInfo.token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	if (response.status === 401) {
		clearAuthInfo();
		throw 'Unauthorized';
	}
	return response.json();
}

export async function putRequest(endpoint: string, body: any) {
	const authInfo = get(authStore);
	if (authInfo === null) {
		throw 'No token found';
	}

	const response = await fetch(`${API_URL}/${endpoint}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${authInfo.token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	if (response.status === 401) {
		clearAuthInfo();
		throw 'Unauthorized';
	}
	return response.json();
}

export async function deleteRequest(endpoint: string) {
	const authInfo = get(authStore);
	if (authInfo === null) {
		throw 'No token found';
	}

	const response = await fetch(`${API_URL}/${endpoint}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authInfo.token}`
		}
	});

	if (response.status === 401) {
		clearAuthInfo();
		throw 'Unauthorized';
	}
	return null;
}

export async function signUpRequest(endpoint: string, data: any) {
	return await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

export async function verifyUserRequest(endpoint: string, data: any) {
	return await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

export async function askForVerificationRequest(endpoint: string, data: any) {
	return await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}

export async function signInRequest(endpoint: string, data: any) {
	return await fetch(`${API_URL}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		credentials: 'include'
	});
}
