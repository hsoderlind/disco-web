export abstract class Accounting {
	static countMargin(retailPrice: number, costPrice: number): number {
		return retailPrice - costPrice;
	}

	static countMarginRate(retailPrice: number, costPrice: number): number {
		if (retailPrice > 0 && costPrice === 0) {
			return retailPrice;
		} else if (retailPrice === 0 && costPrice > 0) {
			return -costPrice;
		} else if (retailPrice === 0 && costPrice === 0) {
			return 0;
		}

		return ((retailPrice - costPrice) / retailPrice) * 100;
	}
}
