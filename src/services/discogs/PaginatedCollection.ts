import { HttpClient } from "@hensod/HttpClient";
import { Collection } from "../../lib/model/Collection";
import { Pagination } from "./types";
import { makeHttpClientForApi } from "../../lib/http/http";

export class PaginatedCollection<C extends Collection<any, any> = Collection<any, any>> {
	static readonly httpClient: HttpClient = makeHttpClientForApi();
	constructor(protected pagination: Pagination, protected readonly collection: C) {}

	getCollection() {
		return this.collection;
	}

	get page() {
		return this.pagination.page;
	}

	get pages() {
		return this.pagination.pages;
	}

	get itemsPerPage() {
		return this.pagination.per_page;
	}

	get items() {
		return this.pagination.items;
	}
}
