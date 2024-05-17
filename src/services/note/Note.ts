import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { NoteType } from "./types";

export class Note extends Model<NoteType, 'id'> {
	static readonly ENDPOINT = '/api/note';

	constructor(data: Partial<NoteType>, protected readonly resource: string, protected readonly resourceId: number, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<NoteType>, resource: string, resourceId: number, shopId: number) {
		if (data.created_at) {
			data.created_at = dayjs(data.created_at);
		}

		const instance = new Note(data, resource, resourceId, shopId);

		return instance;
	}

	getEndpoint(): string {
		const endpoint = super.getEndpoint();
		return `${endpoint}/${this.resource}/${this.resourceId}`;
	}
}
