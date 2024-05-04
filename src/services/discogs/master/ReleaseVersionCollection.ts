import { Collection } from "../../../lib/model/Collection";
import { ReleaseVersion } from "./ReleaseVersion";
import { MasterReleaseVersionsResultSchema } from "./types";

export class ReleaseVersionCollection extends Collection<MasterReleaseVersionsResultSchema, 'id', ReleaseVersion> {
	constructor(items: ReleaseVersion[], shopId: number) {
		super(items);
		ReleaseVersionCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
