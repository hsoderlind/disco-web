import { Model } from "../../lib/model/Model";
import { FileType } from "./types";

export class File extends Model<FileType, 'id'> {
	constructor(data: Partial<FileType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
