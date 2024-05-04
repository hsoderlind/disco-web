import { Model } from "../../../lib/model/Model";
import { MasterReleaseVersionsResultSchema } from "./types";

export class ReleaseVersion extends Model<MasterReleaseVersionsResultSchema, 'id'> {
	constructor(data: MasterReleaseVersionsResultSchema, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
