import { FileRejection, MakeOnDropFn, FileRejectionCollection, Upload } from "./types";
import { File as FileModel } from "../../../../services/file/File";
import { FileWithPath } from "react-dropzone";
import { Str } from "../../../../lib/string/Str";
import { ServerValidationError } from "../../../../lib/error/types";

export const makeOnDrop: MakeOnDropFn = (storageProvider, shopId, onDrop, onUploadedCb, onError) => async (acceptedFile: FileWithPath[], fileRejections) => {
	const models = acceptedFile.map((file) => {
		return new Upload({
			id: Str.uuid(),
			storageProvider,
			buffer: file,
			preview: URL.createObjectURL(file),
			model: new FileModel({
				filename: file.name,
				mimetype: file.type,
				size: file.size,
				storage_provider: storageProvider
			}, shopId),
		}, shopId);
	});
		

	// const collection = new UploadCollection(models);

	const rejectionModels = fileRejections.map((fileRejection) => {
		return new FileRejection({
			key: Str.uuid(),
			...fileRejection
		})
	});

	const rejectionCollection = new FileRejectionCollection(rejectionModels);

	onDrop?.(models, rejectionCollection);
	
	for (const file of models) {
		try {
			await file.upload();
			onUploadedCb?.(file);
		} catch (error) {
			onError?.(file, error as ServerValidationError);
		}
		
	}
}
