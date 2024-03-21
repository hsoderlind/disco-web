import { Category } from "../Category"
import { CategorySchemaType } from "../types"

export const useUpdateCategory = (category: Category) => {
	const queryFn = (categoryData: CategorySchemaType) => {
		category.fill(categoryData);
		return category.update();
	}

	return [queryFn] as const;
}
