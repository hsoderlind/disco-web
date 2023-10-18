import { FC } from 'react';
import { Alert, Modal } from 'antd';
import RegisterShopForm from '../forms/RegisterShopForm';
import useRegisterShopForm, { RegisterShopModalFormConfig } from '../../hooks/useRegisterShopForm';

export type RegisterShopModalProps = RegisterShopModalFormConfig & {
	open: boolean;
	onClose: () => void;
};

const RegisterShopModal: FC<RegisterShopModalProps> = ({ open, onAfterCreate, onClose }) => {
	const { control, onSubmit } = useRegisterShopForm({ onAfterCreate });

	return (
		<Modal
			open={open}
			cancelText='Stäng'
			okText='Registrera'
			title='Registrera din butik'
			onCancel={onClose}
			onOk={onSubmit}>
			<Alert
				message='Välkommen till Disco!'
				description={
					<p>
						Nu är du snart redo att börja använda applikationen, men först behöver vi veta lite om din butik.
						<br />
						Fyll i formuläret nedan och sedan är du igång!
					</p>
				}
				type='info'
				className='my-5'
			/>
			<RegisterShopForm control={control} />
		</Modal>
	);
};

export default RegisterShopModal;
