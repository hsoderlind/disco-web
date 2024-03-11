import { ComponentProps, FC, useState } from 'react';
import { useGetTaxes } from '../../../services/tax/hooks/useGetTaxes';
import { useShopStore } from '../../../services/shop/store';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateTaxClassModal } from '../../modals/CreateTaxClassModal';

export type TaxSelectProps = ComponentProps<typeof Select> & {
	withInactive?: boolean;
	creatable?: boolean;
};

export const TaxSelect: FC<TaxSelectProps> = ({ withInactive = false, creatable = false, ...rest }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetTaxes(shopId, withInactive);
	const { data: taxes, isFetching, isSuccess, isError, refetch } = useQuery(queryKey, queryFn);
	let placeholder = isFetching ? 'Laddar momssatser...' : 'Välj momssats';
	placeholder = !isFetching && isError ? 'Något gick fel' : placeholder;

	const refetchTaxesAndCloseModal = () => {
		refetch();
		setModalOpen(false);
	};

	const cancelModal = () => setModalOpen(false);

	return (
		<>
			<Select
				{...rest}
				options={isSuccess ? taxes.map((tax) => ({ value: tax.getKey(), label: tax.get<string>('name') })) : []}
				placeholder={placeholder}
				status={isError ? 'error' : undefined}
				dropdownRender={(menu) => (
					<>
						{menu}
						{creatable ? (
							<>
								<Divider style={{ margin: '8px 0' }} />
								<Space style={{ margin: '0 8px 4px' }}>
									<Button type='primary' icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
										Ny momssats
									</Button>
								</Space>
							</>
						) : null}
					</>
				)}
			/>
			<CreateTaxClassModal open={modalOpen} onFinish={refetchTaxesAndCloseModal} onCancel={cancelModal} />
		</>
	);
};
