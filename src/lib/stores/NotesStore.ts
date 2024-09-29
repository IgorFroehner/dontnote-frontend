import { type Writable, writable } from 'svelte/store';
import type { Note } from '$lib/types/note';

export const notesStore: Writable<Note[]> = writable([], () => {
	if (typeof localStorage !== 'undefined') {
		const storedNotes = localStorage.getItem('notes');
		if (storedNotes) {
			notesStore.set(JSON.parse(storedNotes));
		}
	}

	return () => {};
});

notesStore.subscribe((notes) => {
	if (typeof localStorage !== 'undefined' && notes.length > 0) {
		localStorage.setItem('notes', JSON.stringify(notes));
	}
});

export const addNote = (note: Note) => {
	notesStore.update((currentNotes) => [...currentNotes, note]);
};

export const removeNote = (note: Note) => {
	notesStore.update((currentNotes) => currentNotes.filter((n) => n !== note));
};
