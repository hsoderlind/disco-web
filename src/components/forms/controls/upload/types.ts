import { ComponentProps, ReactNode } from 'react';
import { ServerValidationError } from './../../../../lib/error/types';
import { DropzoneOptions, FileRejection as RDFileRejection } from 'react-dropzone';
import { File as FileModel } from '../../../../services/file/File';
import { Model } from '../../../../lib/model/Model';
import { Collection } from '../../../../lib/model/Collection';
import { FileType } from '../../../../services/file/types';
import { Button } from 'antd';

export type FileRejectionType = RDFileRejection & {
	key: string;
}

export class FileRejection extends Model<FileRejectionType, 'key'> {
	constructor(data: Partial<FileRejectionType>) {
		super('key', data);
	}
}

export class FileRejectionCollection extends Collection<FileRejectionType, 'key', FileRejection> {
	constructor(items: FileRejection[]) {
		super(items);
	}
}

export type UploadType = {
	key: string;
	storageProvider: string;
	model?: FileModel;
	buffer: globalThis.File;
	preview: ReturnType<typeof URL.createObjectURL>;
	uploadProgress: number;
	isUploaded: boolean;
	error?: ServerValidationError;
	sort_order?: number;
}

export class Upload extends Model<UploadType, 'key'> {
	constructor(data: Partial<UploadType>, protected readonly shopId: number) {
		data.uploadProgress = 0;
		data.isUploaded = false;
		super('key', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	getUploadProgress(cb: (progress: number) => void) {
		const t = setInterval(() => {
			cb(this.get('uploadProgress'));
			
			if (this.get<boolean>('isUploaded') || this.get<ServerValidationError>('error')) {
				clearInterval(t);
			}
		}, 100);
	}

	checkIsUploaded(cb: (uploaded: boolean) => void) {
		const t = setTimeout(() => {
			cb(this.get('isUploaded'));

			if (this.get<boolean>('isUploaded') || this.get<ServerValidationError>('error')) {
				clearInterval(t);
			}
		}, 100);
	}

	async upload() {
		if (!this.isset('model')) {
			this.set('model', new FileModel({}, this.shopId));
		}

		const formData = new FormData();
		formData.append(this.get('storageProvider'), this.get<globalThis.File>('buffer'));
		formData.append('storage_provider', this.get<string>('storageProvider'));
		try {
			const response = await this.httpClient.post<FileType, FormData>(
				this.get<FileModel>('model').getEndpoint(), 
				formData,
				{
					onUploadProgress: (progressEvent) => {
						this.set('uploadProgress', Math.round((progressEvent.loaded * 100) / progressEvent.total!));
					}
				}
			);
			this.set('uploadProgress', 100);
			this.set('isUploaded', true);
			this.get<FileModel>('model').fill(response.data);
		} catch (error) {
			this.set('error', error as ServerValidationError);
			throw error;
		}

		return this;
	}

	private _mockUpload() {
		const t = setInterval(() => {
			this.set('uploadProgress', this.get<number>('uploadProgress') + 10);
		});
		setTimeout(() => {
			clearInterval(t);
			this.set('isUploaded', true);
		}, 100);

		return this;
	}

	async create(): Promise<this> {
		return this.upload();
	}
}

export type onUploadedCb = (file: Upload) => void;

export type OnDropCb = (acceptedFiles: Upload[], fileRejections?: FileRejectionCollection) => void;

export type OnErrorCb = (file: Upload, error: ServerValidationError) => void;

export type CommonUploadProps = Omit<DropzoneOptions, 'onDrop' | 'onDropAccepted' | 'onDropRejected' | 'onError'> & {
	inputName: string;
	onDrop?: OnDropCb;
	onUploaded?: onUploadedCb;
	onError?: OnErrorCb;
};

export type UploadProps = CommonUploadProps & {
	children: ReactNode;
};

type ButtonProps = ComponentProps<typeof Button>;

export type UploadButtonProps = CommonUploadProps & {
	children?: ButtonProps['children'];
	icon?: ButtonProps['icon'];
	size?: ButtonProps['size'];
};

export type UploadHeroProps = CommonUploadProps & {
	icon: ReactNode;
	infoText: ReactNode;
}

export type MakeOnDropFn = (storageProvider: string, shopId: number, onDrop?: OnDropCb, onUploaded?: onUploadedCb, onError?: OnErrorCb) => DropzoneOptions['onDrop'];
