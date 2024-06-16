import { Model } from "../../lib/model/Model";
import { FileType } from "./types";

export class File extends Model<FileType, 'id'> {
	constructor(data: Partial<FileType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	getPublicDownloadUrl() {
		return `${import.meta.env.VITE_API_BASE_URL}/file/${this.shopId}/${this.getKey()}`;
	}

	async download() {
		const response = await this.httpClient.get<Blob>(`${this.getEndpoint(File.ACTION_READ)}/${this.getKey()}?storage_resolver=${this.get('storage_resolver')}`, {responseType: 'blob'})
		
		if (response.data) {
			return URL.createObjectURL(response.data);
		}
	}

	async getSignedUrl() {
		const response = await this.httpClient.get<string>(`${this.getEndpoint(File.ACTION_READ)}/${this.getKey()}/signed-url?storage_resolver=${this.get('storage_resolver')}`);
		return response?.data;
	}

	async delete() {
		const endpoint = this.getEndpoint(File.ACTION_DELETE);
		await this.httpClient.delete(`${endpoint}?storage_resolver=${this.get('storage_resolver')}`);
		this.cleanUp();
		return true;
	}
}
