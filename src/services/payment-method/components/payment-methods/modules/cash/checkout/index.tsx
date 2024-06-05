import { CheckoutTemplate } from '../../../../_templates/checkout';
import { CashCheckoutProps } from './types';

const CashCheckout = ({ name, fee, title, description }: CashCheckoutProps) => {
	return <CheckoutTemplate name={name} title={title} fee={fee} description={description} />;
};

export default CashCheckout;
