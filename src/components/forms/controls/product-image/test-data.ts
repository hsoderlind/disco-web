import { Num } from "../../../../lib/number/Num";
import { Str } from "../../../../lib/string/Str";
import { File } from "../../../../services/file/File";
import { ProductSchemaType } from "../../../../services/product/types";
import { ExtractObjectStructure } from "../../../../types/common";
import { Upload, UploadCollection } from "../upload/types";

export const TEST_DATA = new UploadCollection([
	new Upload({
		key: Str.uuid(),
		preview: 'https://loremflickr.com/320/240',
		model: new File({
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg'
		}, 0),
		uploadProgress: 50,
		isUploaded: true
	}, 0),

	new Upload({
		key: Str.uuid(),
		preview: 'https://loremflickr.com/640/400',
		model: new File({
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg'
		}, 0),
		uploadProgress: 50,
		isUploaded: true
	}, 0),

	new Upload({
		key: Str.uuid(),
		preview: 'https://loremflickr.com/150/150',
		model: new File({
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg'
		}, 0),
		uploadProgress: 100,
		isUploaded: false,
		error: {
			message: 'Något gick fel',
			name: 'Error',
			isAxiosError: false,
			toJSON() {
				return {
					message: 'Något gick fel',
					name: 'Error',
					isAxiosError: false,
				}
			}
		}
	}, 0)
])

type TPRODUCT_IMAGES_TEST_DATA = ExtractObjectStructure<ProductSchemaType['images']>;
export const PRODUCT_IMAGES_TEST_DATA: TPRODUCT_IMAGES_TEST_DATA[] = [
	{
		key: 'pi-1',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-2',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-3',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-4',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-5',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-6',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-7',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-8',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-9',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
	{
		key: 'pi-10',
		sort_order: 0,
		use_as_cover: false,
		meta: {
			filename: Str.uuid(),
			extension: 'jpeg',
			mimetype: 'image/jpeg',
			size: Num.random(10240)
		}
	},
];
