import { Collection as BaseCollection } from "@hensod/Model";
import { Model } from "./Model";
import { makeHttpClientForApi } from "../http/http";

export class Collection<T extends object, I extends keyof T, M extends Model<T, I> = Model<T, I>> extends BaseCollection<T, I, M> {
	protected static readonly httpClient = makeHttpClientForApi();

	constructor(protected readonly items: M[]) {
		super(items);
	}
}
