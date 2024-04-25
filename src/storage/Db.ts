import Dexie, { Table } from 'dexie'; 
import { NoteType } from "../components/postit/types";
import { Prettify } from "../types/common";

export type Note = Prettify<{_id?: number} & NoteType>

export class Database extends Dexie {
	notes: Table<Note> = null!;

	constructor() {
		super('disco');
		this.version(1).stores({
			notes: '++_id, id, color, position, visible, content'
		});
	}
}

export const db = new Database();
