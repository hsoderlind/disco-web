import { Collection } from "../../lib/model/Collection";
import { ActivityLog } from "./ActivityLog";
import { ActivitySchema } from "./types";

export class ActivityLogCollection extends Collection<ActivitySchema, 'id', ActivityLog> {
	constructor(items: ActivityLog[]) {
		super(items);
	}
}
