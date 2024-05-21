import { CommonUploadProps, Upload } from "../../../../components/forms/controls/upload/types";
import app from "../../../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const logotypeSchema = vsb.object({
	logotype: vsb.array(vsb.instanceof(Upload))
});

export type LogotypeSchema = vsbInfer<typeof logotypeSchema>;

export type LogotypeUploadProps = Omit<CommonUploadProps, 'onDrop' | 'onError'>;

export type LogotypeProps = {
	className?: string;
	onUploaded: (file: Upload) => void;
	title?: string;
	defaultValue?: LogotypeSchema['logotype'];
} & LogotypeUploadProps;

export type LogotypePreviewProps = {
	file: Upload;
	index: number;
	remove: (index: number) => void;
}
