import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { CreateBarcodeTypeModal } from '../../modals/CreateBarcodeTypeModal';
import { useGetAllBarcodeTypes } from '../../../services/barcode-type/hooks/useGetAllBarcodeTypes';
import { useShopStore } from '../../../services/shop/store';
import { useQueryClient } from '@tanstack/react-query';

export const CreateBarcodeTypeButton = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey] = useGetAllBarcodeTypes(shopId);
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
			<Button type='default' onClick={openModal} icon={<PlusOutlined />}>
				Ny produktkodstyp
			</Button>
			{modalOpen && <CreateBarcodeTypeModal open={true} onCancel={onCancel} onFinish={onFinish} />}
		</>
	);
};
