import { Card, Radio } from 'antd';
import { useListPaymentMethods } from '../../../../services/payment-method/hooks/useListPaymentMethods';
import { PaymentMethodsCardProps } from './types';
import { ComponentProvider } from '../../../../services/payment-method/components/component-provider';
import { useFormContext } from 'react-hook-form';
import { CreateOrderSchema } from '../../../../services/order/types';
import { FormItem } from 'react-hook-form-antd';

export const PaymentsMethodsCard = ({ className, style }: PaymentMethodsCardProps) => {
	const { data: paymentMethods } = useListPaymentMethods();
	const { control } = useFormContext<CreateOrderSchema>();

	return (
		<Card title='Betalningssätt' className={className} style={style}>
			<FormItem control={control} name='payment_name'>
				<Radio.Group className='w-full'>
					<div className='flex flex-column'>
						{paymentMethods
							?.getItems()
							.map((model) => (
								<ComponentProvider
									key={model.getKey()}
									componentPath={model.get('component')}
									componentProps={model.toJSON()}
								/>
							))}
					</div>
				</Radio.Group>
			</FormItem>
		</Card>
	);
};
