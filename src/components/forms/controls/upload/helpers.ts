import { FileRejection, MakeOnDropFn, FileRejectionCollection, Upload, UploadCollection } from "./types";
import { File as FileModel } from "../../../../services/file/File";
import { FileWithPath } from "react-dropzone";
import { Str } from "../../../../lib/string/Str";
import { ServerValidationError } from "../../../../lib/error/types";

export const makeOnDrop: MakeOnDropFn = (inputName, shopId, onDrop, onUploadedCb, onError) => async (acceptedFile: FileWithPath[], fileRejections) => {
	const models = acceptedFile.map((file) => {
		return new Upload({
			key: Str.uuid(),
			inputName,
			buffer: file,
			preview: URL.createObjectURL(file),
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

	onDrop?.(collection, rejectionCollection);
	
	for (const file of collection) {
		try {
			await file.upload();
			onUploadedCb?.(file);
		} catch (error) {
			onError?.(file, error as ServerValidationError);
		}
		
	}
}