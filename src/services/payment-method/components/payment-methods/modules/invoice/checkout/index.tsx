import { CheckoutTemplate } from '../../../../_templates/checkout';
import { InvoiceCheckoutProps } from './types';

const InvoiceCheckout = ({ name, fee, title, description }: InvoiceCheckoutProps) => {
	return <CheckoutTemplate name={name} title={title} fee={fee} description={description} />;
};

export default InvoiceCheckout;
