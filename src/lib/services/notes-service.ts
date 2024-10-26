import { authStore } from '$lib/stores/AuthStore';
import { get } from 'svelte/store';
import type { Note } from '$lib/types/note';
import Fuse from 'fuse.js';

export const searchNotes = async (query: string) => {
	const notes = await loadNotes();

	const fuseOptions = {
		keys: [
			{ name: 'title', weight: 0.7 },
			{ name: 'content', weight: 0.3 }
		]
	};

	const fuse = new Fuse(notes || [], fuseOptions);

	return fuse.search(query).map((result) => result.item);
};

export const loadNotes = async () => {
	if (get(authStore)) {
		// return notes from backend
		return [] as Note[];
	}

	if (typeof localStorage !== 'undefined') {
		const notes = localStorage.getItem('notes');
		return notes ? JSON.parse(notes) as Note[] : [] as Note[];
	}
	return [] as Note[];
};

export const saveNote = async (note: Note) => {
	if (note.id === undefined) {
		note.id = `local-${Date.now().toString()}`;
	}

	if (get(authStore)) {
		// save note to backend
		return note;
	}

	if (typeof localStorage !== 'undefined') {
		const notes = localStorage.getItem('notes');
		if (notes) {
			const parsedNotes = JSON.parse(notes) as Note[];
			const index = parsedNotes.findIndex((n) => n.id === note.id);
			if (index > -1) {
				parsedNotes[index] = note;
			} else {
				parsedNotes.push(note);
			}
			localStorage.setItem('notes', JSON.stringify(parsedNotes));
		} else {
			localStorage.setItem('notes', JSON.stringify([note]));
		}
	}
	return note;
};

export const deleteNote = async (note: Note) => {
	if (!note.id) return;

	if (get(authStore)) {
		// delete note from backend
		return;
	}

	if (typeof localStorage !== 'undefined') {
		const notes = localStorage.getItem('notes');
		if (notes) {
			const parsedNotes = JSON.parse(notes) as Note[];
			const index = parsedNotes.findIndex((n) => n.id === note.id);
			if (index > -1) {
				parsedNotes.splice(index, 1);
				localStorage.setItem('notes', JSON.stringify(parsedNotes));
			}
		}
	}
};
