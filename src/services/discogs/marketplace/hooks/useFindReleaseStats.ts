import { useQuery } from "@tanstack/react-query";
import app from "../../../../lib/application-builder/ApplicationBuilder"
import { useShopStore } from "../../../shop/store";
import { CurrAbbrSchema } from "../../types";
import { ReleaseStats } from "../ReleaseStats";
import { ReleaseStatsRequestSchema } from "../types"

export const useFindreleaseStats = (releaseId: number) => {
	const input: ReleaseStatsRequestSchema = {
		release_id: releaseId,
		curr_abbr: app.currency as CurrAbbrSchema
	};
	const shopId = useShopStore(state => state.shop?.id);

	const queryKey = [ReleaseStats.ENDPOINT, shopId, [input]];
	const queryFn = () => ReleaseStats.find(input, shopId);
	const query = useQuery(queryKey, queryFn, {enabled: !!shopId});

	return query;
}
