import { CheckoutTemplate } from '../../../_templates/checkout';
import { PickupProps } from './types';

export const Pickup = (props: PickupProps) => {
	return <CheckoutTemplate {...props} />;
};
