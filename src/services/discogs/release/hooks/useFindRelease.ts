import { useQuery } from "@tanstack/react-query";
import app from "../../../../lib/application-builder/ApplicationBuilder";
import { useShopStore } from "../../../shop/store"
import { CurrAbbrSchema } from "../../types";
import { Release } from "../Release";
import { ReleaseRequestSchema } from "../types";

export const useFindRelease = (releaseId?: number) => {
	const shopId = useShopStore(state => state.shop?.id);
	const input: ReleaseRequestSchema = {
		release_id: releaseId!,
		curr_abbr: app.currency as CurrAbbrSchema
	}

	const queryKey = [Release.ENDPOINT, shopId, [input]];
	const queryFn = () => Release.find(input, shopId);
	const query = useQuery(queryKey, queryFn, {enabled: !!releaseId})

	return query;
}
