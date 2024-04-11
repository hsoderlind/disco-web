import { DropzoneOptions, FileRejection as RDFileRejection } from 'react-dropzone';
import { File as FileModel } from '../../../../services/file/File';
import { Model } from '../../../../lib/model/Model';
import { Collection } from '../../../../lib/model/Collection';
import { FileType } from '../../../../services/file/types';

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
	model?: FileModel;
	buffer: globalThis.File
}

export class Upload extends Model<UploadType, 'key'> {
	constructor(data: Partial<UploadType>, protected readonly shopId: number) {
		super('key', data);
	}

	async upload() {
		if (!this.isset('model')) {
			this.set('model', new FileModel({}, this.shopId));
		}

		const formData = new FormData();
		formData.append('file', this.get<globalThis.File>('buffer'));
		const response = await this.httpClient.post<FileType, FormData>(this.get<FileModel>('model').getEndpoint(), formData);

		this.get<FileModel>('model').fill(response.data);
		return this;
	}
}

export class UploadCollection extends Collection<UploadType, 'key', Upload> {
	constructor(items: Upload[]) {
		super(items);
	}
}

export type onUploadedCb = (file: Upload) => void;

export type OnRejectionCb = (fileRejections: FileRejectionCollection) => void;

export type OnDropCb = (acceptedFiles: UploadCollection, fileRejections?: FileRejectionCollection) => void;

export type CommonUploadProps = Omit<DropzoneOptions, 'onDrop' | 'onDropAccepted' | 'onDropRejected'> & {
	onDrop: OnDropCb;
	onUploaded: onUploadedCb;
	onRejection?: OnRejectionCb;
};

export type MakeOnDropAcceptedFn = (shopId: number, onDrop: OnDropCb, onUploaded: onUploadedCb) => DropzoneOptions['onDropAccepted'];

export type MakeOnDropFn = (shopId: number, onDrop: OnDropCb, onUploaded: onUploadedCb, onRejection?: OnRejectionCb) => DropzoneOptions['onDrop'];
