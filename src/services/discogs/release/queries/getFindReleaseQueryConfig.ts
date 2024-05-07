import app from "../../../../lib/application-builder/ApplicationBuilder";
import { CurrAbbrSchema } from "../../types";
import { Release } from "../Release"
import { ReleaseRequestSchema } from "../types";

export const getFindReleaseQueryConfig = (releaseId: number, shopId: number) => {
	const input: ReleaseRequestSchema = {
		release_id: releaseId,
		curr_abbr: app.currency as CurrAbbrSchema
	};
	const queryKey = [Release.ENDPOINT, shopId, releaseId] as const;
	const queryFn = () => Release.find(input, shopId);

	return [queryKey, queryFn, input] as const;
}
