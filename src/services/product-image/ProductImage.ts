import { Model } from "../../lib/model/Model";
import { ProductImageType } from "./types";
import { File } from "../file/File";
import { FileType } from "../file/types";

export class ProductImage extends Model<ProductImageType, 'id'> {
	constructor(data: Partial<ProductImageType>, protected readonly shopId: number) {
		if (typeof data.meta !== 'undefined' && !(data.meta instanceof File)) {
			data.meta = new File(data.meta, shopId);
		}

		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	download() {
		return `${this.getEndpoint()}/download?shopId=${this.shopId}&id=${this.getKey()}`;
	}

	protected creating(data: ProductImageType): ProductImageType {
		if (typeof data.meta !== 'undefined' && data.meta instanceof File) {
			data.meta = data.meta.toJSON();
		}

		return data;
	}

	protected created(data: ProductImageType): ProductImageType {
		if (typeof data.meta !== 'undefined') {
			data.meta = new File(data.meta as Partial<FileType>, this.shopId);
		}

		return data;
	}
	
	protected updating(data: ProductImageType): ProductImageType {
		if (typeof data.meta !== 'undefined' && data.meta instanceof File) {
			data.meta = data.meta.toJSON();
		}

		return data;
	}

	protected updated(data: ProductImageType): ProductImageType {
		if (typeof data.meta !== 'undefined') {
			data.meta = new File(data.meta as Partial<FileType>, this.shopId);
		}

		return data;
	}
}
