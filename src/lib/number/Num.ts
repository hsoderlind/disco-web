import app from "../application-builder/ApplicationBuilder";

export abstract class Num {
	static random(max = Math.random()) {
		return Math.floor(Math.random() * max);
	}

	static formatBytes(bytes: number, decimals = 2) {
		if (!+bytes) {
			return '0 Bytes'
		}

		const k = 1024
		const dm = decimals < 0 ? 0 : decimals
		const sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

		const i = Math.floor(Math.log(bytes) / Math.log(k))

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	}

	static percent(value: number) {
		if (value > 1) {
			value /= 100;
		}
		return new Intl.NumberFormat(
			app.locale,
			{
				style: 'percent',
				minimumFractionDigits: 2,
				maximumFractionDigits: 4,
			}
		).format(value)
	}
}
