import { Enum, EnumInfer } from "../../types/common";

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
		} as const;
	}
}

export type ProductConditionsUnion = EnumInfer<typeof ProductConditions>;
