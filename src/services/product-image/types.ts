import { File } from "../file/File";
import { FileType } from "../file/types";

export type ProductImageType = {
	id: number;
	use_as_cover: boolean;
	sort_order: number;
	meta: FileType | File;
}
