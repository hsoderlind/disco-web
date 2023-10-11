import { Typography } from 'antd';
import { FC, ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

export type LinkProps = ComponentProps<typeof Typography.Link> & { to: string };

const Link: FC<LinkProps> = ({ to, ...props }) => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(to);
	};

	return <Typography.Link {...props} onClick={onClick} />;
};

export default Link;
