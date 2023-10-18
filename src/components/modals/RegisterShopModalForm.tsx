import { FC } from 'react';
import useRegisterShopForm, { RegisterShopModalFormConfig } from '../../hooks/useRegisterShopForm';
import RegisterShopForm from '../forms/RegisterShopForm';
import { Modal } from 'antd';

export type RegisterShopModalFormProps = RegisterShopModalFormConfig & {
	open: boolean;
	onClose: () => void;
};

const RegisterShopModalForm: FC<RegisterShopModalFormProps> = ({ open, onClose, onAfterCreate }) => {
	const { control, onSubmit } = useRegisterShopForm({ onAfterCreate });

	return (
		<Modal
			open={open}
			cancelText='Stäng'
			okText='Registrera'
			title='Registrera butik'
			onCancel={onClose}
			onOk={onSubmit}>
			<RegisterShopForm control={control} />
		</Modal>
	);
};

export default RegisterShopModalForm;
