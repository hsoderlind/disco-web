import Dexie, { Table } from 'dexie'; 
import { NoteIdType, NoteType } from "../components/postit/types";

export type Note = NoteType

export class Database extends Dexie {
	notes!: Table<Note, NoteIdType>;

	constructor() {
		super('disco');
		this.version(1).stores({
			notes: '++_id, id, color, position, visible, content'
		});
		this.version(2).stores({
			notes: '++_id, key, color, position, visible, content'
		});
	}
}

export const db = new Database();
