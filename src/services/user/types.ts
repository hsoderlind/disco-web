import { Enum, EnumInfer } from '../../types/common';
import { Account } from '../account/Account';
import { AccountSchema } from '../account/types';
import { RoleType } from '../role/ttypes';

export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	two_factor_confirmed_at: string;
	created_at: string;
	updated_at: string;
	account: AccountSchema | Account;
	roles: RoleType[];
}

export class UserState extends Enum {
	static readonly INVITED = 'INVITED';
	static readonly REGISTERED = 'REGISTERED';

	static values() {
		return [
			this.INVITED,
			this.REGISTERED
		] as const;
	}

	static toObject() {
		return {
			[this.INVITED]: this.INVITED,
			[this.REGISTERED]: this.REGISTERED
		} as const;
	}
}

export type UserStateUnion = EnumInfer<typeof UserState>;
