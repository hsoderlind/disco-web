import { Model } from "../../lib/model/Model";
import { File } from "../file/File";
import { FileType } from "../file/types";
import { LogotypeSchema } from "./types";

export class Logotype extends Model<LogotypeSchema, 'id'> {
	constructor(data: Partial<LogotypeSchema>, protected readonly shopId: number) {
		super('id', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<LogotypeSchema>, shopId: number) {
		const instance = new Logotype(data, shopId);

		instance.meta();

		return instance;
	}

	meta(): File {
		if (!this.hasRelation('meta')) {
			const model = new File(this.get<FileType>('meta'), this.shopId);
			return this.hasOneRelation(model, 'meta');
		}

		return this.getHasOneRelation('meta');
	}
}
