import { useMutation } from "@tanstack/react-query"
import { ServerValidationError } from "../../../lib/error/types"
import { UseMutationOptions } from "../../../types/common"
import Shop from "../Shop"
import { LogotypeSchema } from "../../logotype/types";

type MutationFnArgs = {logotype: LogotypeSchema, context: 'default' | 'mini'};

export const useSetLogotype = (shopId: number, options?: UseMutationOptions<Shop, ServerValidationError, MutationFnArgs>) => {
	const mutationFn = ({logotype, context}: MutationFnArgs) => Shop.setLogotype(shopId, logotype, context);
	const mutation = useMutation(mutationFn, options);

	return mutation;
}
