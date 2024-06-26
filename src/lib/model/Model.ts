import {Model as BaseModel} from '@hensod/model';
import { makeHttpClientForApi } from '../http/http';
import { HttpClient } from '@hensod/http-client';
import { Str } from '../string/Str';

export class Model<T extends object, K extends keyof T> extends BaseModel<T, K> {
	protected static readonly httpClient: HttpClient = makeHttpClientForApi();
	
	constructor(key: K, data?: Partial<T>) {
		super(key, data);
		this.httpClient = makeHttpClientForApi();
	}

	getBaseEndpoint(): string {
		const slugged = Str.kebabCase(this.constructor.name);

		return `api/${slugged}`;
	}
}
