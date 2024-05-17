import { Model } from "../../lib/model/Model";
import { Account } from "../account/Account";
import { AccountSchema } from "../account/types";
import { CreditBalance } from "./CreditBalance";
import { CreditBalanceType, CustomerType } from "./types";

export class Customer extends Model<CustomerType, 'id'> {
	static readonly ENDPOINT = '/api/customer';

	constructor(data: Partial<CustomerType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async find(id: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<CustomerType>(`${this.ENDPOINT}/${id}`);

		if (response.data) {
			return this.make(response.data, shopId);
		}
	}

	static make(data: Partial<CustomerType>, shopId: number) {
		const customer = new Customer(data, shopId);

		customer.account();
		customer.shippingAddress();
		customer.billingAddress();
		customer.creditBalance();

		return customer;
	}

	account(): Account {
		if (!this.hasRelation('account')) {
			return this.hasOneRelation(new Account(this.get<AccountSchema>('account'), this.shopId), 'account')
		}

		return this.getHasOneRelation('account');
	}

	shippingAddress(): Account {
		if (!this.hasRelation('shipping_address')) {
			return this.hasOneRelation(new Account(this.get<AccountSchema>('shipping_address'), this.shopId), 'shipping_address')
		}

		return this.getHasOneRelation('shipping_address');
	}

	billingAddress(): Account {
		if (!this.hasRelation('billing_address')) {
			return this.hasOneRelation(new Account(this.get<AccountSchema>('billing_address'), this.shopId), 'billing_address')
		}

		return this.getHasOneRelation('billing_address');
	}

	creditBalance(): CreditBalance {
		if (!this.hasRelation('credit_balance')) {
			return this.hasOneRelation(new CreditBalance(this.get<CreditBalanceType>('credit_balance'), this.shopId), 'credit_balance');
		}

		return this.getHasOneRelation('credit_balance');
	}
}
