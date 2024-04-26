import { FC, createRef, useState } from 'react';
import { CreateFn, NoteType, PositionType, PostItContextType, PostItProviderProps, RemoveFn, UpdateFn } from './types';
import { PostItContext } from './post-it-context';
import { Str } from '../../lib/string/Str';
import { MenuRef } from 'antd';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Droppable } from './droppable';
import { useStoreNote } from './useStoreNote';
import { useLiveQuery } from 'dexie-react-hooks';
import { useFetchAllNotes } from './useFetchAllNotes';
import { useUpdateNote } from './useUpdateNote';
import { useRemoveNote } from './useRemoveNote';

export const PostItProvider: FC<PostItProviderProps> = ({ children }) => {
	const offsetLeft = document.body.offsetWidth - 320;
	const buttonRef = createRef<MenuRef>();
	const fetchAll = useFetchAllNotes();
	const dbUpdate = useUpdateNote();
	const dbRemove = useRemoveNote();
	const notes = useLiveQuery(() => fetchAll());
	console.log('notes', notes);
	const [position, setPosition] = useState<PositionType>({ x: offsetLeft, y: 64 });
	const store = useStoreNote();

	const create: CreateFn = async () => {
		const newNote: NoteType = {
			key: Str.uuid(),
			position: position,
			color: 'hsl(48, 97%, 77%)',
			visible: true
		};

		const id = await store(newNote);

		newNote._id = id;

		const newPosition: PositionType = {
			x: position.x + -20,
			y: position.y + 20
		};

		setPosition(newPosition);
	};

	const update: UpdateFn = async (id, values) => {
		await dbUpdate(id, values);
	};

	const remove: RemoveFn = async (id) => {
		await dbRemove(id);
	};

	const visibleNotes = notes?.filter((note) => note.visible);

	const value: PostItContextType = {
		create,
		update,
		remove,
		notes,
		visibleNotes,
		buttonRef
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;
		notes &&
			notes.forEach(async (note) => {
				if (note._id !== active.id) {
					return note;
				}

				note.position.y += delta.y;
				note.position.x += delta.x;

				await dbUpdate(note._id, note);
			});
	};

	return (
		<PostItContext.Provider value={value}>
			<DndContext onDragEnd={handleDragEnd}>
				<Droppable>{children}</Droppable>
			</DndContext>
		</PostItContext.Provider>
	);
};
