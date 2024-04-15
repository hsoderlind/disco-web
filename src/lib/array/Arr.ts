export abstract class Arr {
	static move<TArray extends any[] = any[]>(arr: TArray, from: number, to: number) {
		const entry = arr[from];
		arr.splice(from, 1);
		arr.splice(to, 0, entry);
		return Array.from(arr);
	}
}
