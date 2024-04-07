import { useQueryClient } from '@tanstack/react-query';
import { useGetAllAttributeTypes } from '../../../services/product-attribute/hooks/useGetAllAttributeTypes';
import { useShopStore } from '../../../services/shop/store';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateAttributeTypeModal } from '../../modals/CreateAttributeTypeModal';
import { useState } from 'react';

export const CreateAttributeTypeButton = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = useGetAllAttributeTypes(shopId);
	const queryClient = useQueryClient();

	const openModal = () => setModalOpen(true);

	const onCancel = () => setModalOpen(false);

	const onFinish = () => {
		queryClient.refetchQueries({
			queryKey,
			exact: true,
			type: 'active'
		});
		setModalOpen(false);
	};

	return (
		<>
			<Button onClick={openModal} icon={<PlusOutlined />}>
				Ny attributtyp
			</Button>
			{modalOpen && <CreateAttributeTypeModal open onCancel={onCancel} onFinish={onFinish} />}
		</>
	);
};
