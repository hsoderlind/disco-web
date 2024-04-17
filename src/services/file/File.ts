import { Model } from "../../lib/model/Model";
import { FileType } from "./types";

export class File extends Model<FileType, 'id'> {
	constructor(data: Partial<FileType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	async download(storageProvider: string) {
		// return `${import.meta.env.VITE_API_BASE_URL}${this.getEndpoint()}/${this.getKey()}?shopId=${this.shopId}`;
		const response = await this.httpClient.get<Blob>(`${this.getEndpoint()}/${this.getKey()}?storage_provider=${storageProvider}`, {responseType: 'blob'})
		
		if (response.data) {
			return URL.createObjectURL(response.data);
		}
	}

	async delete() {
		const endpoint = this.getEndpoint();
		const key = this.getKey();
		await this.httpClient.delete(`${endpoint}/${key}?storage_provider=${this.get('storage_provider')}`);
		this.cleanUp();
		return true;
	}
}
