import { Collection as BaseCollection } from "../../../lib/model/Collection";
import { Model } from "./Model";
import { SearchResultSchema } from "./types";

export class Collection extends BaseCollection<SearchResultSchema, 'id', Model> {
	constructor(items: Model[]) {
		super(items);
	}
}
