import { Model } from "../../lib/model/Model";
import { FileType } from "./types";

export class File extends Model<FileType, 'id'> {
	constructor(data: Partial<FileType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	async download() {
		const response = await this.httpClient.get<Blob>(`${this.getEndpoint()}/${this.getKey()}?storage_resolver=${this.get('storage_resolver')}`, {responseType: 'blob'})
		
		if (response.data) {
			return URL.createObjectURL(response.data);
		}
	}

	async getSignedUrl() {
		const response = await this.httpClient.get<string>(`${this.getEndpoint()}/${this.getKey()}/signed-url?storage_resolver=${this.get('storage_resolver')}`);
		return response?.data;
	}

	async delete() {
		const endpoint = this.getEndpoint();
		const key = this.getKey();
		await this.httpClient.delete(`${endpoint}/${key}?storage_resolver=${this.get('storage_resolver')}`);
		this.cleanUp();
		return true;
	}
}
