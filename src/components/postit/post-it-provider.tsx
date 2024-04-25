import { FC, createRef, useState } from 'react';
import { CreateFn, NoteType, PositionType, PostItContextType, PostItProviderProps, RemoveFn, UpdateFn } from './types';
import { PostItContext } from './post-it-context';
import { Str } from '../../lib/string/Str';
import { MenuRef } from 'antd';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Droppable } from './droppable';

export const PostItProvider: FC<PostItProviderProps> = ({ children }) => {
	const offsetLeft = document.body.offsetWidth - 320;
	const buttonRef = createRef<MenuRef>();
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [position, setPosition] = useState<PositionType>({ x: offsetLeft, y: 64 });

	const create: CreateFn = () => {
		const newNote: NoteType = {
			id: Str.uuid(),
			position: position,
			color: 'hsl(48, 97%, 77%)',
			visible: true
		};

		const newPosition: PositionType = {
			x: position.x + -20,
			y: position.y + 20
		};

		setNotes((notes) => [...notes, newNote]);
		setPosition(newPosition);
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
		visibleNotes,
		buttonRef
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;
		const newNotes = notes.map((note) => {
			if (note.id !== active.id) {
				return note;
			}

			note.position.y += delta.y;
			note.position.x += delta.x;

			return note;
		});

		setNotes(newNotes);
	};

	return (
		<PostItContext.Provider value={value}>
			<DndContext onDragEnd={handleDragEnd}>
				<Droppable>{children}</Droppable>
			</DndContext>
		</PostItContext.Provider>
	);
};
