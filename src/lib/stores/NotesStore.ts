import { type Writable, writable } from 'svelte/store';
import type { Note } from '$lib/types/note';
import { deleteNote, loadNotes, saveNote } from '$lib/services/notes-service';

export const notesStore: Writable<Note[]> = writable([], () => {
	const notes = loadNotes();
	notes.then((notes) => {
		if (notes) {
			notesStore.set(notes);
		}
	});

	return () => {};
});

export const addNote = (note: Note) => {
	saveNote(note).then((note) => {
		notesStore.update((currentNotes) => [...currentNotes, note]);
	});
};

export const updateNote = (note: Note) => {
	saveNote(note).then((note) => {
		notesStore.update((currentNotes) => {
			const index = currentNotes.findIndex((n) => n.uuid === note.uuid);
			if (index > -1) {
				currentNotes[index] = note;
			}
			return currentNotes;
		});
	});
};

export const removeNote = (note: Note) => {
	deleteNote(note).then(() => {
		notesStore.update((currentNotes) => currentNotes.filter((n) => n.uuid !== note.uuid));
	});
};
