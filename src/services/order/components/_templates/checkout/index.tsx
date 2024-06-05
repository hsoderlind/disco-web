import { Typography } from 'antd';
import { CheckoutTemplateProps } from './types';
import { Currency } from '../../../../../lib/number/Currency';
import classes from './checkout-template.module.scss';

export const CheckoutTemplate = ({ title, value }: CheckoutTemplateProps) => {
	return (
		<div className={classes['order-total']}>
			<Typography.Text>{title}</Typography.Text>
			<Typography.Text>{Currency.format(value)}</Typography.Text>
		</div>
	);
};
