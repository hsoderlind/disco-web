import { useQueryClient } from '@tanstack/react-query';
import { useGetAllAttributeTypes } from '../../../services/product-attribute/hooks/useGetAllAttributeTypes';
import { useShopStore } from '../../../services/shop/store';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateAttributeTypeModal } from '../../modals/CreateAttributeTypeModal';
import { FC, useState } from 'react';
import { AttributeType } from '../../../services/product-attribute/AttributeType';

export type CreateAttributeTypeButtonProps = {
	onCreated?: (attributeType: AttributeType) => void;
};

export const CreateAttributeTypeButton: FC<CreateAttributeTypeButtonProps> = ({ onCreated }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = useGetAllAttributeTypes(shopId);
	const queryClient = useQueryClient();

	const openModal = () => setModalOpen(true);

	const onCancel = () => setModalOpen(false);

	const onFinish = (attributeType: AttributeType) => {
		queryClient.refetchQueries({
			queryKey,
			exact: true,
			type: 'active'
		});
		setModalOpen(false);
		onCreated?.(attributeType);
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
