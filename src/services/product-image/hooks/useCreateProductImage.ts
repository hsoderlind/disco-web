import { Upload } from "../../../components/forms/controls/upload/types";
import { File } from "../../file/File";
import { useShopStore } from "../../shop/store"
import { ProductImage } from "../ProductImage";
import { ProductImageType } from "../types";

export const useCreateProductImage = () => {
	const shopId = useShopStore((state) => state.shop.id);
	const queryFn = (file: Upload) => {
		const data: Partial<ProductImageType> = {
			use_as_cover: false,
			sort_order: 0,
			meta: file.get<File>('model').toJSON()
		};
		const productImage = new ProductImage(data, shopId);
		return productImage.create();
	}

	return [queryFn] as const;
}
