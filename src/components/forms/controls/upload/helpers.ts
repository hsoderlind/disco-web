import { FileRejection, MakeOnDropAcceptedFn, MakeOnDropFn, FileRejectionCollection, Upload, UploadCollection } from "./types";
import { File as FileModel } from "../../../../services/file/File";
import { FileWithPath } from "react-dropzone";
import { Str } from "../../../../lib/string/Str";

export const makeOnDropAccepted: MakeOnDropAcceptedFn  = (shopId, onDrop, onUploadedCb) => async (files: FileWithPath[]) => {
	const models = files.map((file) => {
		return new Upload({
			key: Str.uuid(),
			buffer: file,
			model: new FileModel({
				filename: file.name,
				mimetype: file.type,
				size: file.size
			}, shopId),
		}, shopId);
	});

	const collection = new UploadCollection(models);

	onDrop(collection);

	for (const file of collection.getItems()) {
		await file.upload();
		onUploadedCb(file);
	}
}

export const makeOnDrop: MakeOnDropFn = (shopId, onDrop, onUploadedCb, onRejection) => async (acceptedFile: FileWithPath[], fileRejections) => {
	const models = acceptedFile.map((file) => {
		return new Upload({
			key: Str.uuid(),
			buffer: file,
			model: new FileModel({
				filename: file.name,
				mimetype: file.type,
				size: file.size
			}, shopId),
		}, shopId);
	});
		

	const collection = new UploadCollection(models);

	const rejectionModels = fileRejections.map((fileRejection) => {
		return new FileRejection({
			key: Str.uuid(),
			...fileRejection
		})
	});

	const rejectionCollection = new FileRejectionCollection(rejectionModels);

	onDrop(collection, rejectionCollection);
	onRejection?.(rejectionCollection);
	
	for (const file of collection.getItems()) {
		await file.upload();
		onUploadedCb(file);
	}
}
