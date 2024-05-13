import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { CustomerType } from '../../services/customer/types';
import { DataGrid } from '../../components/data-grid/DataGrid';
import { ButtonBar } from '../../components/forms/buttonbar';
import { Button, Dropdown } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateCustomerModal } from './components/create-customer-model';
import { useGetCustomers } from '../../services/customer/hooks/useGetCustomers';
import dayjs from 'dayjs';
import { CellRendererProps, HandleDropdownClick } from '../../components/data-grid/types';
import { useNavigate } from '../../hooks/useNavigate';

export function Component() {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const { data: customers, refetch } = useGetCustomers();

	const handleDropdownClick: HandleDropdownClick<CustomerType> = (model) => (e) => {
		switch (e.key) {
			case 'view':
				navigate(`./view/${model.id}`, model.name);
		}
	};

	const [columnDefs] = useState<ColDef<CustomerType>[]>([
		{
			field: 'id',
			headerName: 'ID'
		},
		{
			field: 'name',
			headerName: 'Namn'
		},
		{
			field: 'email',
			headerName: 'E-post'
		},
		{
			field: 'created_at',
			headerName: 'Kontot skapades',
			valueFormatter: (props) => dayjs(props.value).format('L LT')
		},
		{
			colId: 'actions',
			cellRenderer: (props: CellRendererProps<CustomerType, never>) => {
				return (
					<Dropdown
						menu={{
							items: [
								{
									key: 'view',
									label: 'Se information'
								}
							],
							onClick: handleDropdownClick(props.data)
						}}>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Dropdown>
				);
			},
			type: 'rightAligned'
		}
	]);

	const handleCreated = () => {
		setModalOpen(false);
		refetch();
	};

	return (
		<>
			<ContentLayout>
				<MainContentLayout
					noSpacing
					renderButtonBar={
						<ButtonBar buttonsPlacement='end' size='narrow'>
							<Button icon={<PlusOutlined />} type='default' size='large' onClick={() => setModalOpen(true)}>
								Lägg till kund
							</Button>
						</ButtonBar>
					}>
					<DataGrid columnDefs={columnDefs} rowData={customers?.toJSON()} />
				</MainContentLayout>
			</ContentLayout>
			<CreateCustomerModal open={modalOpen} onCancel={() => setModalOpen(false)} onCreated={handleCreated} />
		</>
	);
}
