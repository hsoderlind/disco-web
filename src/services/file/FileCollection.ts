import { Collection } from "../../lib/model/Collection";
import { File } from "./File";
import { FileType } from "./types";

export class FileCollection extends Collection<FileType, 'id', File> {
	static readonly BASE_URI = '/api/file';

	constructor(items: File[], shopId: number) {
		super(items);
		FileCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
