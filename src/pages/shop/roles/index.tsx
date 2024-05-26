import { ErrorBoundary } from '../../../components/error-boundary';
import { useCallback, useMemo, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { RoleType } from '../../../services/role/ttypes';
import { booleanFormatter } from '../../../components/data-grid/formatters/boolean-formatter';
import { CellRendererProps, HandleDropdownClick } from '../../../components/data-grid/types';
import { Button, Dropdown, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { Sidebar } from '../components/sidebar';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { DataGrid } from '../../../components/data-grid/DataGrid';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { CreateRole } from './components/create';
import { useListRoles } from '../../../services/role/hooks/useListRoles';
import { EditRole } from './components/edit';
import { useDeleteRole } from '../../../services/role/hooks/useDeleteRole';
import app from '../../../lib/application-builder/ApplicationBuilder';

export { ErrorBoundary };

export function Component() {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState<RoleType | undefined>();
	const { data: roles, refetch } = useListRoles();
	const mutation = useDeleteRole({
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Rollen har nu raderats' });
		}
	});

	const removeRole = useCallback(
		async (model: RoleType) => {
			await mutation.mutateAsync(model.id);
			refetch();
		},
		[mutation, refetch]
	);

	const handleDropdownClick: HandleDropdownClick<RoleType> = useCallback(
		(model) => (e) => {
			switch (e.key) {
				case 'edit':
					setSelectedRole(model);
					break;
				case 'delete':
					Modal.confirm({
						title: `Radera ${model.name}`,
						icon: <ExclamationCircleFilled />,
						content: (
							<>
								<b>Är du säker på att du vill radera {model.name} från butikskontot?</b>
								<br />
								Denna åtgärd kommer permanent ta bort rollen från kontot och det går inte att ångra.
							</>
						),
						okText: 'Ja',
						cancelText: 'Nej',
						onOk: async () => {
							await removeRole(model);
						}
					});
					break;
			}
		},
		[removeRole]
	);

	const columnDefs = useMemo<ColDef<RoleType>[]>(
		() => [
			{
				field: 'name',
				headerName: 'Namn'
			},
			{
				field: 'editable',
				headerName: 'Kan redigeras?',
				valueFormatter: booleanFormatter
			},
			{
				field: 'deletable',
				headerName: 'Kan raderas?',
				valueFormatter: booleanFormatter
			},
			{
				colId: 'actions',
				headerName: '',
				cellRenderer: (props: CellRendererProps<RoleType, never>) => (
					<Dropdown
						disabled={!props.data.editable && !props.data.deletable}
						menu={{
							items: [
								{
									key: 'edit',
									label: 'Redigera',
									disabled: !props.data.editable
								},
								{
									key: 'delete',
									label: 'Radera',
									danger: true,
									disabled: !props.data.deletable
								}
							],
							onClick: handleDropdownClick(props.data)
						}}>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Dropdown>
				),
				type: 'rightAligned'
			}
		],
		[handleDropdownClick]
	);

	const rowData = useMemo(() => roles?.toJSON() ?? [], [roles]);

	const handleCreated = () => {
		setCreateModalOpen(false);
		refetch();
	};

	const handleUpdated = () => {
		setSelectedRole(undefined);
		refetch();
	};

	return (
		<>
			<ContentLayout>
				<Sidebar selectedItems={['roles']} />
				<MainContentLayout
					noSpacing
					renderButtonBar={
						<ButtonBar buttonsPlacement='end'>
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
								Lägg till roll
							</Button>
						</ButtonBar>
					}>
					<DataGrid columnDefs={columnDefs} rowData={rowData} />
				</MainContentLayout>
			</ContentLayout>
			{createModalOpen && <CreateRole open onCancel={() => setCreateModalOpen(false)} onCreated={handleCreated} />}
			{typeof selectedRole !== 'undefined' && (
				<EditRole open role={selectedRole} onCancel={() => setSelectedRole(undefined)} onUpdated={handleUpdated} />
			)}
		</>
	);
}
