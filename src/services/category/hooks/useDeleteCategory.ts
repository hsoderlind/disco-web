import { Category } from "../Category"

export const useDeleteCategory = () => {
	const queryFn = (category: Category) => category.delete();
	return [queryFn] as const;
}
