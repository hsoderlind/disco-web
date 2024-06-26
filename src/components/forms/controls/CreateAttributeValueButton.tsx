import { FC, useState } from 'react';
import { useShopStore } from '../../../services/shop/store';
import { useGetAttributeValuesByAttributeType } from '../../../services/product-attribute/hooks/useGetAttributeValuesByAttributeType';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateAttributeValueModal } from '../../modals/CreateAttributeValueModal';
import { AttributeValue } from '../../../services/product-attribute/AttributeValue';

export type CreateAttributeValueButtonProps = {
	attributeTypeId: number;
	onCreated: (attributeValue: AttributeValue) => void;
};

export const CreateAttributeValueButton: FC<CreateAttributeValueButtonProps> = ({ attributeTypeId, onCreated }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = useGetAttributeValuesByAttributeType(attributeTypeId, shopId);
	const queryClient = useQueryClient();

	const openModal = () => setModalOpen(true);

	const onCancel = () => setModalOpen(false);

	const onFinish = (attributeValue: AttributeValue) => {
		queryClient.refetchQueries({
			queryKey,
			exact: true,
			type: 'active'
		});
		setModalOpen(false);
		onCreated?.(attributeValue);
	};

	return (
		<>
			<Button onClick={openModal} icon={<PlusOutlined />}>
				Nytt attributvärde
			</Button>
			{modalOpen && (
				<CreateAttributeValueModal
					attributeTypeId={attributeTypeId}
					open={true}
					onCancel={onCancel}
					onFinish={onFinish}
				/>
			)}
		</>
	);
};
