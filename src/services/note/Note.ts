import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { NoteSchema, NoteType } from "./types";

export class Note extends Model<NoteType, 'id'> {
	static readonly ENDPOINT = '/api/note';

	constructor(data: Partial<NoteType>, protected readonly resource: string, protected readonly resourceId: number, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(id: number, resource: string, resourceId: number, shopId: number) {
		const model = Note.make({}, resource, resourceId, shopId);
		const endpoint = model.getEndpoint('read');

		const response = await model.getHttpClient().get<NoteSchema>(`${endpoint}/${id}`);

		if (response.data) {
			model.fill(response.data);
		}

		return model;
	}

	static make(data: Partial<NoteType>, resource: string, resourceId: number, shopId: number) {
		if (data.created_at) {
			data.created_at = dayjs(data.created_at);
		}

		const instance = new Note(data, resource, resourceId, shopId);

		return instance;
	}

	getEndpoint(action: string): string {
		const endpoint = super.getEndpoint(action);

		if (action === 'create') {
			return `${endpoint}/${this.resource}/${this.resourceId}`;
		}

		return endpoint;
	}
}
