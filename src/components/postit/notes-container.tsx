import { Note } from './note';
import { usePostItContext } from './usePostItContext';

export const NotesContainer = () => {
	const { visibleNotes } = usePostItContext();

	return (
		<>
			{visibleNotes.map((note) => (
				<Note key={note.id} id={note.id} />
			))}
		</>
	);
};
