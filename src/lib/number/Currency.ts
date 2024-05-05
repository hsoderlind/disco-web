import app from "../application-builder/ApplicationBuilder";

export abstract class Currency {
	static format(number: number | bigint, currency = app.currency) {
		return new Intl.NumberFormat(
			app.locale, 
			{
				style: 'currency', 
				currency,
				currencyDisplay: 'symbol',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}
		).format(number);
	}
}
