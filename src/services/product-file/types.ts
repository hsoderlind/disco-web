import { FileType } from "../file/types";
import { File } from "../file/File";

export type ProductFileType = {
	id: number
	sort_order: number;
	meta: FileType | File;
}
