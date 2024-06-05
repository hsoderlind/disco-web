import { useFormContext, useWatch } from 'react-hook-form';
import { CreateOrderSchema } from '../../../../services/order/types';
import { useLoadCustomers } from '../../../../services/customer/hooks/useLoadCustomers';
import { Card } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { CustomerSelect } from '../../../../components/forms/controls/customer-select';
import { Customer } from '../../../../services/customer/Customer';
import { useMemo } from 'react';
import { Address } from '../../../../components/address';
import { CustomerCardProps } from './types';

export const CustomerCard = ({ className, style }: CustomerCardProps) => {
	const { data: customers } = useLoadCustomers();
	const { control } = useFormContext<CreateOrderSchema>();

	const customerId = useWatch({ control, name: 'customer_id' });

	const customer = useMemo<Customer | undefined>(() => customers?.find(customerId), [customers, customerId]);

	return (
		<Card title='Kund' className={className} style={style}>
			<FormItem control={control} name='customer_id'>
				<CustomerSelect placeholder='Välj eller sök efter kund' />
			</FormItem>
			{customer && (
				<>
					<Address className='mb-input' type='inner' title='Fakturaadress' address={customer.billingAddress()} />
					<Address type='inner' title='Leveransadress' address={customer.shippingAddress()} />
				</>
			)}
		</Card>
	);
};
