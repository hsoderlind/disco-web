import { Ref, useEffect, useMemo, useRef } from 'react';
import { ErrorBoundary } from '../../../components/error-boundary';
import { useListPermissionsByRole } from '../../../services/permissions/hooks/useListPermissionByRole';
import { useListPermissions } from '../../../services/permissions/hooks/useListPermissions';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { Button, Form, FormInstance, List, Switch, Typography } from 'antd';
import { useListRoles } from '../../../services/role/hooks/useListRoles';
import { RoleSelect } from '../../../components/forms/controls/role-select';
import { useSearchParams } from 'react-router-dom';
import { RoleSelectProps } from '../../../components/forms/controls/role-select/types';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { SyncPermissionsWithRoleSchema, syncPermissionsWithRoleSchema } from '../../../services/permissions/types';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { useSyncWithRoles } from '../../../services/permissions/hooks/useSyncWithRoles';
import { ZodError } from 'zod';
import { useUserCan } from '../../../components/permissions/hooks/useUserCan';

export { ErrorBoundary };

const TRANSLATIONS: Record<string, string> = {
	catalog: 'Katalog',
	category: 'Kategorier',
	checkout: 'Kassan',
	'company profile': 'Bolagsprofilen',
	customers: 'Kunder',
	discogs: 'Discogs',
	invoicing: 'Fakturering',
	orders: 'Beställningar',
	'product type': 'Produkttyper',
	products: 'Produkter',
	sales: 'Försäljning',
	'sales channels': 'Försäljningskanaler',
	'shop profile': 'Butiksprofilen',
	'shop settings': 'Butiksinställningar',
	stock: 'Lager',
	subscription: 'Prenumeration',
	tax: 'Moms',
	tradera: 'Tradera',
	'user management': 'Användarhantering'
};

export function Component() {
	useUserCan('access shop permission');

	const formRef = useRef<FormInstance<SyncPermissionsWithRoleSchema>>();
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedRoleId = searchParams.has('role') ? +searchParams.get('role')! : undefined;
	const { data: roles } = useListRoles();
	const { data: permissions } = useListPermissions();
	const { data: rolePermissions, refetch } = useListPermissionsByRole(selectedRoleId, { enabled: !!selectedRoleId });
	const mutation = useSyncWithRoles({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Rollens behörigheter har nu uppdaterats' });
			refetch();
		}
	});
	const groupedPermissions = useMemo(() => permissions?.groupBy('group'), [permissions]);

	const selectedRole = useMemo(() => {
		if (typeof selectedRoleId !== 'undefined' && typeof roles !== 'undefined') {
			return roles.find(selectedRoleId);
		}
	}, [selectedRoleId, roles]);

	const selectRoleId: RoleSelectProps['onChange'] = (value) => {
		formRef.current?.resetFields();
		searchParams.set('role', value);
		setSearchParams(searchParams);
	};

	const handleSubmit = () => {
		const values = formRef.current?.getFieldsValue();
		const formValues: SyncPermissionsWithRoleSchema = {
			roleId: -1,
			permissions: []
		};

		Object.entries(values as object).forEach(([key, value]) => {
			if (key === 'roleId') {
				formValues[key] = value;
			} else if (value === true) {
				formValues.permissions.push(key);
			}
		});

		try {
			syncPermissionsWithRoleSchema.parse(formValues);
			mutation.mutate(formValues);
		} catch (error) {
			if (error instanceof ZodError) {
				app.addErrorNotification({ description: 'Det förekommer fel i formuläret' });
			} else if (typeof error === 'object' && error !== null && 'message' in error) {
				app.addErrorNotification({ description: error.message as string });
			} else if (typeof error === 'string') {
				app.addErrorNotification({ description: error });
			} else {
				console.error(error);
				app.addErrorNotification({ description: 'Okänt fel' });
			}
		}
	};

	useEffect(() => {
		if (typeof rolePermissions !== 'undefined' && rolePermissions.size > 0) {
			for (const rolePermission of rolePermissions) {
				formRef.current?.setFieldValue(rolePermission.get('name'), true);
			}
		}
	}, [rolePermissions]);

	useEffect(() => {
		if (typeof selectedRoleId === 'number') {
			formRef.current?.setFieldValue('roleId', selectedRoleId);
		}
	}, [selectedRoleId]);

	return (
		<ContentLayout>
			<MainContentLayout
				renderButtonBar={
					<ButtonBar>
						<Button type='primary' size='large' onClick={handleSubmit}>
							Spara
						</Button>
					</ButtonBar>
				}>
				<Typography.Title level={2} className='md:w-half block-center'>
					{typeof selectedRole === 'undefined' ? 'Behörigheter' : `Behörigheter för ${selectedRole.get('name')}`}
				</Typography.Title>
				<Form
					ref={formRef as Ref<FormInstance<SyncPermissionsWithRoleSchema>>}
					layout='vertical'
					className='md:w-half block-center mb-5'>
					<Form.Item name={'roleId'} label='Välj roll'>
						<RoleSelect onChange={selectRoleId} />
					</Form.Item>
					{typeof rolePermissions !== 'undefined' && typeof groupedPermissions !== 'undefined' && (
						<>
							{Object.entries(groupedPermissions.getItems()).map(([group, collection]) => (
								<List
									key={group}
									className='mb-5'
									size='large'
									header={<Typography.Title level={3}>{TRANSLATIONS[group]}</Typography.Title>}
									bordered
									dataSource={collection.getItems()}
									renderItem={(model) => (
										<List.Item
											actions={[
												<Form.Item name={model.get('name')} noStyle>
													<Switch defaultChecked={rolePermissions ? rolePermissions.has(model.getKey()) : false} />
												</Form.Item>
											]}>
											{model.get<string>('description')}
										</List.Item>
									)}
								/>
							))}
						</>
					)}
				</Form>
			</MainContentLayout>
		</ContentLayout>
	);
}
