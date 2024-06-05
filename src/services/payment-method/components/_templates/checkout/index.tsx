import { Radio, Typography } from 'antd';
import { CheckoutTemplateProps } from './types';
import { Currency } from '../../../../../lib/number/Currency';
import classes from './checkout-template.module.scss';

export const CheckoutTemplate = ({ name, title, children, description, fee }: CheckoutTemplateProps) => {
	return (
		<div className={classes['payment-method']}>
			<div className='flex column-gap-4'>
				<Radio value={name} />
				<div className='flex-1'>
					<div className='flex flex-row justify-between'>
						<div className='payment-method__title'>
							<Typography.Text>{title}</Typography.Text>
						</div>
						{typeof fee !== 'undefined' && fee !== null ? (
							<div className={classes['payment-method__fee']}>
								<Typography.Text type='secondary'>Avgift:</Typography.Text>
								<Typography.Text>{Currency.format(fee)}</Typography.Text>
							</div>
						) : null}
					</div>
					{typeof description !== 'undefined' ? (
						<div className='payment-method__description'>
							<Typography.Text type='secondary'>{description}</Typography.Text>
						</div>
					) : null}
				</div>
			</div>
			{typeof children !== 'undefined' ? children : null}
		</div>
	);
};
