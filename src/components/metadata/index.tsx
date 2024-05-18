import { useState } from 'react';
import { useListMetadata } from '../../services/metadata/hooks/useListMetadata';
import { AfterActionCallbackFn, MetadataProps, RenderButtonBarParams } from './types';
import { MainContentLayout } from '../layout/content-layout/MainContentLayout';
import { Button, List } from 'antd';
import { MetadataSchema } from '../../services/metadata/types';
import { Metadata as MetadataModel } from '../../services/metadata/Metadata';
import { MetadataCreate } from './create';
import { MetadataEdit } from './edit';

export const Metadata = ({ renderButtonBar, resource, resourceId }: MetadataProps) => {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedMetadata, setSelectedMetadata] = useState<MetadataModel | undefined>();
	const { data: metadataCollection, isFetching, isLoading, refetch } = useListMetadata(resource, resourceId);

	const renderButtonBarParams: RenderButtonBarParams = {
		openModal: () => setCreateModalOpen(true),
		closeModal: () => setCreateModalOpen(false)
	};

	const editMetadata = (id: number) => () => {
		const metadata = metadataCollection?.find(id);

		if (metadata) {
			setSelectedMetadata(metadata);
			setEditModalOpen(true);
		}
	};

	const handleAfterAction: AfterActionCallbackFn = () => {
		if (createModalOpen) {
			setCreateModalOpen(false);
		} else if (editModalOpen) {
			setEditModalOpen(false);
		}

		refetch();
	};

	return (
		<>
			<MainContentLayout renderButtonBar={<>{renderButtonBar?.(renderButtonBarParams)}</>}>
				<List<MetadataSchema>
					loading={isLoading || isFetching}
					itemLayout='horizontal'
					pagination={{ position: 'bottom', align: 'start' }}
					dataSource={metadataCollection?.toJSON()}
					rowKey={'id'}
					renderItem={(metadata) => (
						<List.Item
							actions={[
								<Button key='edit' type='link' onClick={editMetadata(metadata.id!)}>
									Redigera
								</Button>
							]}>
							<List.Item.Meta title={metadata.key} />
							<List.Item.Meta description={metadata.value} />
						</List.Item>
					)}
				/>
			</MainContentLayout>
			{createModalOpen && (
				<MetadataCreate
					open={createModalOpen}
					resource={resource}
					resourceId={resourceId}
					onCancel={() => setCreateModalOpen(false)}
					onCreated={handleAfterAction}
				/>
			)}
			{selectedMetadata && editModalOpen && (
				<MetadataEdit
					metadata={selectedMetadata}
					open={editModalOpen}
					resource={resource}
					resourceId={resourceId}
					onCancel={() => setEditModalOpen(false)}
					onUpdated={handleAfterAction}
				/>
			)}
		</>
	);
};
