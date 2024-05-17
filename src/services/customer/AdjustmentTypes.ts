import { Enum, EnumInfer } from "../../types/common";

export class AdjustmentTypes extends Enum {
	static readonly DEBET = 'debet';
	static readonly CREDIT = 'credit';

	static values() {
		return [
			AdjustmentTypes.DEBET,
			AdjustmentTypes.CREDIT
		] as const;
	}

	static toObject() {
		return {
			[AdjustmentTypes.DEBET]: AdjustmentTypes.DEBET,
			[AdjustmentTypes.CREDIT]: AdjustmentTypes.CREDIT
		} as const;
	}
}

export type AdjustmentTypesUnion = EnumInfer<typeof AdjustmentTypes>;
