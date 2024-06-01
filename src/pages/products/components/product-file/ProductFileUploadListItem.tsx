import { forwardRef, memo, useState } from 'react';
import { ProductFileUploadListItemProps } from './types';
import { DragOutlined, EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { FileIcon } from '../../../../components/file-icons/FileIcon';
import { File } from '../../../../services/file/File';
import { Button, Dropdown, MenuProps, Modal, Progress } from 'antd';
import { Num } from '../../../../lib/number/Num';
import classes from './product-file-upload-list.module.scss';
import { useProductFileUploadContext } from './hooks/useProductFileUploadContext';

const InteralProductFileUploadListItem = forwardRef<HTMLDivElement, ProductFileUploadListItemProps>(
	({ attributes, listeners, model, index, ...props }, ref) => {
		const { remove } = useProductFileUploadContext();
		const [progress, setProgress] = useState(0);
		model.getUploadProgress(setProgress);

		const onDropDownClick: MenuProps['onClick'] = (event) => {
			switch (event.key) {
				case 'download':
					(async () => {
						const url = await model.get<File>('model').getSignedUrl();
						window.location.href = url;
					})();
					break;
				case 'delete':
					Modal.confirm({
						title: 'Radera filen',
						icon: <ExclamationCircleFilled />,
						content: (
							<>
								Är du säker på att du vill radera filen?
								<br />
								Denna åtgärd kommer permanent radera filen och det går inte att ångra.
							</>
						),
						okText: 'Ja',
						cancelText: 'Nej',
						onOk: async () => {
							remove(index);
							await model.get<File>('model').delete();
						}
					});
			}
		};

		return (
			<div {...props} ref={ref} className={classes['product-file-upload-list__item']}>
				<div className='product-file-upload-list__drag-handler-col'>
					<DragOutlined {...attributes} {...listeners} />
				</div>
				<div className={'product-file-upload-list__icon-col'}>
					<FileIcon extension={model.get<File>('model').get('extension')} />
				</div>
				<div className={classes['product-file-upload-list__progress-col']}>
					<Progress percent={progress} size='small' />
				</div>
				<div className={classes['product-file-upload-list__filename-col']}>
					{model.get<File>('model').get('filename')}
				</div>
				<div className='product-file-upload-list__size-fol'>
					{Num.formatBytes(model.get<File>('model').get('size'))}
				</div>
				<div className='product-file-upload-list__action-col'>
					<Dropdown
						menu={{
							items: [
								{
									label: 'Ladda ner',
									key: 'download'
								},
								{
									label: 'Radera',
									key: 'delete',
									danger: true
								}
							],
							onClick: onDropDownClick
						}}>
						<Button type='link' icon={<EllipsisOutlined />} />
					</Dropdown>
				</div>
			</div>
		);
	}
);

const ProductFileUploadListItem = memo(InteralProductFileUploadListItem);
export { ProductFileUploadListItem };
