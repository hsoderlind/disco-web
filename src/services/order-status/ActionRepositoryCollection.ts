import { Collection } from "../../lib/model/Collection";
import { ActionRepository } from "./ActionRepository";
import { ActionRepositorySchema } from "./types";

export class ActionRepositoryCollection extends Collection<ActionRepositorySchema, 'name', ActionRepository> {
	static readonly ENDPOINT = 'api/action-repository';

	constructor(items: ActionRepository[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ActionRepositorySchema[]>(this.ENDPOINT);

		return new ActionRepositoryCollection(response.data.map(item => ActionRepository.make(item, shopId)));
	}
}
