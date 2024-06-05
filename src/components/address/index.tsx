import { Card } from 'antd';
import { AddressProps } from './types';

export const Address = ({ address, description, loading, title, actions, extra, className, type }: AddressProps) => {
	return (
		<Card title={title} loading={loading} actions={actions} extra={extra} className={className} type={type}>
			{description && <Card.Meta description={description} />}
			{address && (
				<div className='flex flex-column row-gap-3'>
					<div>{address.get<string>('name')}</div>
					{address.isset('address1') && <div>{address.get<string>('address1')}</div>}
					{address.isset('address2') && <div>{address.get<string>('address2')}</div>}
					<div>
						{address.get<string>('zip')} {address.get<string>('city')}
					</div>
				</div>
			)}
		</Card>
	);
};
