import {v4 as uuid} from 'uuid';

export abstract class Str {
	static uuid() {
		return uuid();
	}

	static kebabCase(input: string) {
		return input.replace(/([a-z])([A-Z])/g, "$1-$2")
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	static toNumber(input: string): number
	{
		let numberish = input;
		
		if (/[0-9]+[\s.]{1}[0-9]+[,]{1}[0-9]+/g.test(input)) {
			numberish = input.replace(/[\s.]+/g, '')
				.replace(/[,]/g, '.');
		}

		return parseFloat(numberish);
	}
}
