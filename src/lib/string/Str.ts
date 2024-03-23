import {v4 as uuid} from 'uuid';

export abstract class Str {
	static uuid() {
		return uuid();
	}
}
