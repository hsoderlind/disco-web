import { ErrorBoundary } from '../../../components/error-boundary';
import { useCallback, useMemo, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { ShopUserType } from '../../../services/shop/types';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { DataGrid } from '../../../components/data-grid/DataGrid';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { Button, Dropdown, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { CellRendererProps, HandleDropdownClick } from '../../../components/data-grid/types';
import { useShopStore } from '../../../services/shop/store';
import { CreateShopUser } from './components/create';
import { useAuthContext } from '../../../contexts/auth/useAuthContext';
import { EditShopUser } from './components/edit';
import { useRemoveShopUser } from '../../../services/shop/hooks/useRemoveShopUser';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { Sidebar } from '../components/sidebar';
import { useListShopUsers } from '../../../services/shop/hooks/useListShopUsers';
import { useMasquerade } from '../../../services/user/hooks/useMasquerade';
import { useTransferOwnership } from '../../../services/shop/hooks/useTransferOwnership';
import { useGetShop } from '../../../services/shop/hooks/useGetShop';

export { ErrorBoundary };

export function Component() {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<ShopUserType | undefined>();
	const { data: shopUsers, refetch } = useListShopUsers();
	const shopOwner = useShopStore((state) => state.shop.account_owner);
	const shopId = useShopStore((state) => state.shop.id);
	const { refetch: refetchShop } = useGetShop(shopId);
	const { user } = useAuthContext();
	const mutation = useRemoveShopUser({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Användaren är nu borttagen' });
		}
	});
	const masquerade = useMasquerade();
	const transferOwnership = useTransferOwnership({
		onSuccess: (shopUser) => {
			app.addSuccessNotification({ description: `${shopUser.get('name')} är nu kontoägare.` });
			refetch();
			refetchShop();
		}
	});

	const removeShopUser = useCallback(
		async (model: ShopUserType) => {
			await mutation.mutateAsync(model.id);
			refetch();
		},
		[mutation, refetch]
	);

	const handleDropdownClick: HandleDropdownClick<ShopUserType> = useCallback(
		(model) => (e) => {
			switch (e.key) {
				case 'edit':
					setSelectedUser(model);
					break;
				case 'transfer-ownership':
					Modal.confirm({
						title: `Byt kontoägare till ${model.name}`,
						icon: <ExclamationCircleFilled />,
						content: `Är du säker på att du vill att ${model.name} ska bli ägare för butikskontot?`,
						okText: 'Ja',
						cancelText: 'Nej',
						onOk: async () => {
							await transferOwnership.mutateAsync(model.id);
						}
					});
					break;
				case 'remove':
					Modal.confirm({
						title: `Ta bort ${model.name}`,
						icon: <ExclamationCircleFilled />,
						content: (
							<>
								<b>Är du säker på att du vill ta bort {model.name} från butikskontot?</b>
								<br />
								Denna åtgärd kommer permanent ta bort användaren från kontot och det går inte att ångra.
							</>
						),
						okText: 'Ja',
						cancelText: 'Nej',
						onOk: async () => {
							await removeShopUser(model);
						}
					});
					break;
				case 'masquerade':
					Modal.confirm({
						title: 'Maskera dig som annan användare',
						icon: <ExclamationCircleFilled />,
						content: (
							<>
								<b>Är du säker på att du vill maskera dig som {model.name}?</b>
								<br />
								Att maskera sig som en annan användare innebär att man loggar in som denna användaren och alla åtgärder
								man gör loggas på användaren.
								<br />
								Att maskera sig som en annan användare kan vara bra att göra om användaren själv t.ex. inte kan logga in
								till sitt konto för att genomföra en åtgärd.
							</>
						),
						okText: 'Ja',
						cancelText: 'Nej',
						onOk: async () => {
							masquerade.mutateAsync(model.id);
						}
					});
					break;
			}
		},
		[removeShopUser, masquerade]
	);

	const columnDefs = useMemo<ColDef<ShopUserType>[]>(
		() => [
			{
				field: 'name',
				headerName: 'Namn'
			},
			{
				field: 'email',
				headerName: 'E-post'
			},
			{
				field: 'state',
				headerName: 'Status',
				valueFormatter: (params) =>
					params.value === 'INVITED' ? 'Inbjuden' : params.value === 'REGISTERED' ? 'Registrerad' : 'n/a'
			} as ColDef<ShopUserType, ShopUserType['state']>,
			{
				field: 'roles',
				headerName: 'Roller',
				valueFormatter: (params) => params.value?.map((role) => role.name).join(', ')
			} as ColDef<ShopUserType, ShopUserType['roles']>,
			{
				colId: 'actions',
				headerName: '',
				cellRenderer: (props: CellRendererProps<ShopUserType, never>) => (
					<Dropdown
						menu={{
							items: [
								{
									key: 'edit',
									label: 'Redigera'
								},
								{
									key: 'transfer-ownership',
									label: 'Byt kontoägare',
									disabled: shopOwner === props.data.id || props.data.state === 'INVITED'
								},
								{
									key: 'masquerade',
									label: 'Maskera dig som användaren',
									disabled: user?.getKey() === props.data.id || props.data.state === 'INVITED'
								},
								{
									key: 'remove',
									label: 'Ta bort',
									danger: true,
									disabled: shopOwner === props.data.id
								}
							],
							onClick: handleDropdownClick(props.data)
						}}>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Dropdown>
				),
				type: 'rightAligned'
			} as ColDef<ShopUserType>
		],
		[handleDropdownClick, shopOwner, user]
	);

	const rowData = useMemo(() => shopUsers?.toJSON() ?? [], [shopUsers]);

	const handleCreated = () => {
		setCreateModalOpen(false);
		refetch();
	};

	const handleUpdated = () => {
		setSelectedUser(undefined);
		refetch();
	};

	return (
		<>
			<ContentLayout>
				<Sidebar selectedItems={['users']} />
				<MainContentLayout
					noSpacing
					renderButtonBar={
						<ButtonBar buttonsPlacement='end'>
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
								Lägg till användare
							</Button>
						</ButtonBar>
					}>
					<DataGrid columnDefs={columnDefs} rowData={rowData} />
				</MainContentLayout>
			</ContentLayout>
			{createModalOpen && <CreateShopUser open onCancel={() => setCreateModalOpen(false)} onCreated={handleCreated} />}
			{typeof selectedUser !== 'undefined' && (
				<EditShopUser
					shopUser={selectedUser}
					onCancel={() => setSelectedUser(undefined)}
					onUpdated={handleUpdated}
					open
				/>
			)}
		</>
	);
}
