import { FC, useState } from 'react';
import { CreateFn, NoteType, PositionType, PostItContextType, PostItProviderProps, RemoveFn, UpdateFn } from './types';
import { PostItContext } from './post-it-context';
import { Str } from '../../lib/string/Str';

export const PostItProvider: FC<PostItProviderProps> = ({ children }) => {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [latestPosition, setLatestPosition] = useState<PositionType>({ x: 60, y: 60 });

	const create: CreateFn = () => {
		const newLatestPosition: PositionType = {
			x: latestPosition.x + 20,
			y: latestPosition.y + 20
		};

		const newNote: NoteType = {
			id: Str.uuid(),
			position: newLatestPosition,
			color: 'hsl(48, 97%, 77%)',
			visible: true
		};

		setNotes((notes) => [...notes, newNote]);
		setLatestPosition(newLatestPosition);
	};

	const update: UpdateFn = (id, values) => {
		const newNotes = notes.map((note) => {
			if (note.id !== id) {
				return note;
			}

			return { ...note, ...values };
		});

		setNotes(newNotes);
	};

	const remove: RemoveFn = (id) => {
		setNotes((notes) => notes.filter((note) => note.id !== id));
	};

	const visibleNotes = notes.filter((note) => note.visible);

	const value: PostItContextType = {
		create,
		update,
		remove,
		notes,
		visibleNotes
	};

	return <PostItContext.Provider value={value}>{children}</PostItContext.Provider>;
};
