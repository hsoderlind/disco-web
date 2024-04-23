import app from "../application-builder/ApplicationBuilder";

export abstract class Currency {
	static format(number: number | bigint) {
		return new Intl.NumberFormat(
			app.locale, 
			{
				style: 'currency', 
				currency: 'SEK',
				currencyDisplay: 'symbol',
				minimumFractionDigits: 2,
				maximumFractionDigits: 4,
			}
		).format(number);
	}
}
