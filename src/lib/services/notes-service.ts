import { authInfo } from '$lib/stores/AuthStore';
import { notesStore } from '$lib/stores/NotesStore';
import { get } from 'svelte/store';
import type { Note } from '$lib/types/note';

export const searchNotes = async(query: string) => {
	const notes = await loadNotes();

	return notes?.filter((note: Note) => {
		return note.title.includes(query) || note.content.includes(query);
	});
};

export const loadNotes = async() => {
	if (get(authInfo)) {
		// return notes from backend
		return notesStore.set([]);
	}

	if (typeof localStorage !== 'undefined') {
		const notes = localStorage.getItem('notes');
		return notes ? JSON.parse(notes) as Note[] : [];
	}
}

export const saveNote = async(note: Note) => {
	if (note.id === undefined) {
		note.id = `local-${Date.now().toString()}`;
	}

	if (get(authInfo)) {
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

export const deleteNote = async(note: Note) => {
	if (!note.id) return;

	if (get(authInfo)) {
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
