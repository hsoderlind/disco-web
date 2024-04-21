import { Model } from "../../lib/model/Model";
import { FileType } from "./types";

export class File extends Model<FileType, 'id'> {
	constructor(data: Partial<FileType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	async download() {
		const response = await this.httpClient.get<Blob>(`${this.getEndpoint()}/${this.getKey()}?storage_provider=${this.get('storage_provider')}`, {responseType: 'blob'})
		
		if (response.data) {
			return URL.createObjectURL(response.data);
		}
	}

	async getSignedUrl() {
		const response = await this.httpClient.get<string>(`${this.getEndpoint()}/${this.getKey()}/signed-url?storage_provider=${this.get('storage_provider')}`);
		return response?.data;
	}

	async delete() {
		const endpoint = this.getEndpoint();
		const key = this.getKey();
		await this.httpClient.delete(`${endpoint}/${key}?storage_provider=${this.get('storage_provider')}`);
		this.cleanUp();
		return true;
	}
}
