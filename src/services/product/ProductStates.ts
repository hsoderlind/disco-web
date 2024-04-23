import { Enum, EnumInfer } from "../../types/common";

export class ProductStates extends Enum {
	static readonly DRAFT = 'draft';
	static readonly PUBLISHED = 'published';

	static values() {
		return [
			ProductStates.DRAFT,
			ProductStates.PUBLISHED
		] as const;
	}

	static toObject() {
		return {
			[ProductStates.DRAFT]: ProductStates.DRAFT,
			[ProductStates.PUBLISHED]: ProductStates.PUBLISHED
		} as const;
	}
}

export type ProductStatesUnion = EnumInfer<typeof ProductStates>;
