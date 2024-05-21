export abstract class Obj {
	static isNotEmpty<TData extends object>(input: TData | undefined | null): input is TData {
		return typeof input !== 'undefined' && input !== null && Object.keys(input).length > 0;
	}
}
