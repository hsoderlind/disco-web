import { useNavigate } from '../../../../../hooks/useNavigate';
import { Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import { ImportButtonProps } from './types';

export const ImportButton = ({ releaseId }: ImportButtonProps) => {
	const navigate = useNavigate();

	const handleClick = () => navigate(`../import/${releaseId}`, 'Importera artikel');

	return <Button type='text' icon={<ImportOutlined />} title='Importera artikeln' onClick={handleClick} />;
};
