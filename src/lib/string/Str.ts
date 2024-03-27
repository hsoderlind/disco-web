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
}
