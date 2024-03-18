import { Category } from "../Category"
import { CategorySchemaType } from "../types"

export const useCreateCategory = (shopId: number) => {
	const queryFn = (data: CategorySchemaType) => {
		const category = new Category(data, shopId);
		return category.create();
	}

	return [queryFn] as const;
}
