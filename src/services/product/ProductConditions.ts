import { Enum } from "../../types/common";

export class ProductConditions extends Enum {
	static readonly NEW = 'new';
	static readonly USED = 'used';
	static readonly REFURBISHED = 'refurbished';

	static values() {
		return [
			ProductConditions.NEW,
			ProductConditions.USED,
			ProductConditions.REFURBISHED
		] as const
	}

	static toObject() {
		return {
			[ProductConditions.NEW]: ProductConditions.NEW,
			[ProductConditions.USED]: ProductConditions.USED,
			[ProductConditions.REFURBISHED]: ProductConditions.REFURBISHED
		}
	}
}

const conditions = ProductConditions.toObject();
export type ProductConditionsUnion = keyof typeof conditions;
