import { Select, SelectProps } from 'antd';
import { useListRoles } from '../../../../services/role/hooks/useListRoles';
import { RoleSelectProps, SelectRef } from './types';
import { forwardRef } from 'react';

export const RoleSelect = forwardRef<SelectRef, RoleSelectProps>(
	({ showAccountOwner = false, ...props }: RoleSelectProps, ref) => {
		const { data: roles, isFetching, isLoading, isError } = useListRoles();

		let placeholder = 'Välj roll(er)';

		if (isLoading || isFetching) {
			placeholder = 'Laddar roller...';
		} else if (isError) {
			placeholder = 'Något gick fel!';
		}

		const options: SelectProps['options'] =
			typeof roles !== 'undefined'
				? roles
						.filter((model) => (!showAccountOwner ? model.get('name') !== 'Kontoägare' : true))
						.map((role) => ({
							value: role.getKey(),
							label: role.get<string>('name')
						}))
				: [];

		return <Select ref={ref} {...props} placeholder={placeholder} options={options} />;
	}
);
