import { Card, Popconfirm } from 'antd';
import { NoteViewProps } from './types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDeleteNote } from '../../../../../../services/note/hooks/useDeleteNote';
import { useLoaderData } from '../../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../../services/customer/Customer';
import app from '../../../../../../lib/application-builder/ApplicationBuilder';
import { queryListNotes } from '../../../../../../services/note/queries';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { NoteEdit } from '../edit';

export const NoteView = ({ note }: NoteViewProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const customer = useLoaderData<Customer>();
	const mutation = useDeleteNote('customer', customer.getKey()!, {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Anteckningen har nu raderats' });
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
		}
	});

	const [queryKey] = queryListNotes('customer', customer.getKey()!);

	const deleteNote = (id: number) => async () => {
		await mutation.mutateAsync(id);
		app.queryClient.refetchQueries(queryKey);
	};

	const handleUpdated = () => {
		setModalOpen(false);
		app.queryClient.refetchQueries(queryKey);
	};

	return (
		<>
			<Card
				title={note.get<string>('title')}
				extra={note.get<Dayjs>('created_at').format('L LT')}
				actions={[
					<EditOutlined key='edit' onClick={() => setModalOpen(true)} />,
					<Popconfirm
						key='delete'
						title='Radera anteckningen'
						description='Är du säker på att du vill radera anteckningen?'
						onConfirm={deleteNote(note.getKey()!)}
						okButtonProps={{ loading: mutation.isLoading }}
						okText='Ja'
						cancelText='Nej'>
						<DeleteOutlined key='delete' />
					</Popconfirm>
				]}>
				<p className='white-space-pre-line'>{note.get<string>('content')}</p>
			</Card>
			{modalOpen && (
				<NoteEdit
					note={note}
					open={modalOpen}
					resource='customer'
					resourceId={customer.getKey()!}
					onCancel={() => setModalOpen(false)}
					onUpdated={handleUpdated}
				/>
			)}
		</>
	);
};
