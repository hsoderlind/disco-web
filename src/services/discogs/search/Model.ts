import { Model as BaseModel } from "../../../lib/model/Model";
import { SearchResultSchema } from "./types";

export class Model extends BaseModel<SearchResultSchema, 'id'> {
	constructor(data: Partial<SearchResultSchema>) {
		super('id', data);
	}
}
