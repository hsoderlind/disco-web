import { Collection } from "../../lib/model/Collection";
import { Note } from "./Note";
import { NoteType } from "./types";

export class NoteCollection extends Collection<NoteType, 'id', Note> {
	static readonly ENDPOINT = '/api/note';

	constructor(items: Note[], shopId: number) {
		super(items);
		NoteCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async list(resource: string, resourceId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<NoteType[]>(`${this.ENDPOINT}/${resource}/${resourceId}`);

		if (response.data) {
			const models = response.data.map((item) => Note.make(item, resource, resourceId, shopId));
			return new NoteCollection(models, shopId);
		}
	}
}
