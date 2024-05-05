import { Button } from 'antd';
import { AddToWantlistButtonProps } from './types';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { AddToWantlistModal } from './modal';

export const AddToWantListButton = ({ releaseId }: AddToWantlistButtonProps) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Button
				type='text'
				icon={<UnorderedListOutlined />}
				title='Lägg till i din önskelista'
				onClick={() => setModalOpen(true)}
			/>
			<AddToWantlistModal
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				releaseId={releaseId}
				onFinish={() => setModalOpen(false)}
			/>
		</>
	);
};
