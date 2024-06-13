import { useFormContext, useWatch } from 'react-hook-form';
import { useListShippingMethods } from '../../../../services/shipping-method/hooks/useListShippingMethods';
import { ShippingMethodsCardProps } from './types';
import { CreateOrderSchema } from '../../../../services/order/types';
import { Card, Radio } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { Pickup } from '../../../../services/shipping-method/components/modules/pickup/checkout';
import { useEffect, useMemo } from 'react';

const MAP_MODEL_TO_COMPONENT: Record<string, (...args: any[]) => JSX.Element> = {
	pickup: Pickup
};

export const ShippingMethodsCard = ({ className, style }: ShippingMethodsCardProps) => {
	const { data: shippingMethods } = useListShippingMethods();
	const { control, setValue } = useFormContext<CreateOrderSchema>();
	const shippingName = useWatch({ control, name: 'shipping_name' });
	const shippingMethod = useMemo(
		() => shippingName && shippingMethods?.find(shippingName),
		[shippingName, shippingMethods]
	);

	useEffect(() => {
		if (shippingMethod) {
			setValue('shipping_method', shippingMethod.toJSON());
		}
	}, [shippingMethod, setValue]);

	return (
		<Card title='Leveranssätt' className={className} style={style}>
			<FormItem control={control} name='shipping_name'>
				<Radio.Group className='w-full'>
					<div className='flex flex-column'>
						{shippingMethods?.getItems().map((model) => {
							const Component = MAP_MODEL_TO_COMPONENT[model.getKey()];

							return Component ? <Component {...model.toJSON()} /> : null;
						})}
					</div>
				</Radio.Group>
			</FormItem>
		</Card>
	);
};
