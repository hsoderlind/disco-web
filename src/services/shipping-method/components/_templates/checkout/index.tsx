import { Radio, Typography } from 'antd';
import { CheckoutTemplateProps } from './types';
import { Currency } from '../../../../../lib/number/Currency';
import classes from './checkout-template.module.scss';

export const CheckoutTemplate = ({ children, name, title, description, fee }: CheckoutTemplateProps) => {
	return (
		<div className={classes['shipping-method']}>
			<div className='flex column-gap-4'>
				<Radio value={name} />
				<div className='flex-1'>
					<div className='flex flex-row justify-between'>
						<div className='shipping-method__title'>
							<Typography.Text>{title}</Typography.Text>
						</div>
						<div className={classes['shipping-method__fee']}>
							<Typography.Text type='secondary'>Avgift:</Typography.Text>
							<Typography.Text className='pl-3'>{Currency.format(fee)}</Typography.Text>
						</div>
					</div>
					{typeof description !== 'undefined' ? (
						<div className='shipping-method__description'>
							<Typography.Text type='secondary'>{description}</Typography.Text>
						</div>
					) : null}
				</div>
			</div>
			{typeof children !== 'undefined' ? children : null}
		</div>
	);
};
