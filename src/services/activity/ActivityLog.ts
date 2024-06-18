import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ActivitySchema } from "./types";

export class ActivityLog extends Model<ActivitySchema, 'id'> {
	constructor(data: Partial<ActivitySchema>) {
		super('id', data);
	}

	static make(data: Partial<ActivitySchema>) {
		if ('created_at' in data) {
			data['created_at'] = dayjs(data['created_at']);
		}

		const instance = new ActivityLog(data);

		return instance;
	}
}
