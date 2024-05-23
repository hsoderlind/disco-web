import { loadShopUsers as loader } from '../../../services/shop/loaders';
import { ErrorBoundary } from '../../../components/error-boundary';
import { useLoaderData } from '../../../hooks/useLoaderData';
import { ShopUserCollection } from '../../../services/shop/ShopUserCollection';
import { useMemo, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { ShopUserType } from '../../../services/shop/types';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { DataGrid } from '../../../components/data-grid/DataGrid';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { Button, Dropdown } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { CellRendererProps, HandleDropdownClick } from '../../../components/data-grid/types';
import { useShopStore } from '../../../services/shop/store';

export { loader, ErrorBoundary };

export function Component() {
	const [selectedUser, setSelectedUser] = useState<ShopUserType | undefined>();
	const shopUsers = useLoaderData<ShopUserCollection>();
	const shopOwner = useShopStore((state) => state.shop.account_owner);

	const handleDropdownClick: HandleDropdownClick<ShopUserType> = (model) => (e) => {
		switch (e.key) {
			case 'edit':
				//
				break;
			case 'transfer-ownership':
				//
				break;
			case 'delete':
				//
				break;
		}
	};

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
				headerName: 'Status'
			},
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
									disabled: shopOwner === props.data.id
								},
								{
									key: 'delete',
									label: 'Radera',
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
		[]
	);

	const rowData = shopUsers.toJSON();

	return (
		<ContentLayout>
			<MainContentLayout
				noSpacing
				renderButtonBar={
					<ButtonBar buttonsPlacement='end'>
						<Button type='primary' icon={<PlusOutlined />}>
							Lägg till användare
						</Button>
					</ButtonBar>
				}>
				<DataGrid columnDefs={columnDefs} rowData={rowData} />
			</MainContentLayout>
		</ContentLayout>
	);
}
