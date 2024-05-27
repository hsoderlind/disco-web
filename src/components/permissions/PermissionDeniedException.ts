export class PermissionDeniedException extends Error {
	constructor(public permission: string) {
		const message = `Behörighet saknas (${permission})`;
		super(message);
		this.name = 'PermissionDeniedException';
		Object.setPrototypeOf(this, PermissionDeniedException.prototype);
	}
}
