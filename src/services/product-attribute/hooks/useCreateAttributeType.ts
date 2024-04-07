import { AttributeType } from "../AttributeType"
import { AttributeTyoeSchemaType } from "../types"

export const useCreateAttributeType = (shopId: number) => {
	const queryFn = (data: AttributeTyoeSchemaType) => {
		const attributeType = new AttributeType(data, shopId);
		return attributeType.create();
	}

	return [queryFn] as const;
}
