import { Account } from '../account/Account';
import { AccountSchema } from '../account/types';

export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	two_factor_confirmed_at: string;
	created_at: string;
	updated_at: string;
	account: AccountSchema | Account;
}
