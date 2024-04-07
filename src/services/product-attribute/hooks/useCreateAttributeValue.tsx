import { AttributeValue } from '../AttributeValue';
import { AttributeValueSchemaType } from '../types';

export const useCreateAttributeValue = (shopId: number) => {
	const queryFn = (data: AttributeValueSchemaType) => {
		const attributeValue = new AttributeValue(data, shopId);
		return attributeValue.create();
	};

	return [queryFn] as const;
};
