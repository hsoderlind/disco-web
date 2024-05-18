import { Button, Col, List, Popconfirm, Row } from 'antd';
import { MainContentLayout } from '../../../../../../components/layout/content-layout/MainContentLayout';
import { useLoaderData } from '../../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../../services/customer/Customer';
import { useListNotes } from '../../../../../../services/note/hooks/useListNotes';
import { NoteType } from '../../../../../../services/note/types';
import { ButtonBar } from '../../../../../../components/forms/buttonbar';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../hooks/useNavigate';
import { useMemo, useState } from 'react';
import { NoteForm } from './create';
import { useDeleteNote } from '../../../../../../services/note/hooks/useDeleteNote';
import app from '../../../../../../lib/application-builder/ApplicationBuilder';
import { NoteView } from './view';

export const Notes = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedNoteId, setSelectedNoteId] = useState<NoteType['id'] | undefined>();
	const navigate = useNavigate();
	const customer = useLoaderData<Customer>();
	const { data: notes, isLoading, isFetching, refetch } = useListNotes('customer', customer.getKey()!);
	const mutation = useDeleteNote('customer', customer.getKey()!, {
		onSuccess: () => {
			app.addSuccessNotification({ description: 'Anteckningen har nu raderats' });
		},
		onError: (error) => {
			app.addErrorNotification({ description: error.message });
		}
	});

	const selectedNote = useMemo(() => notes?.find(selectedNoteId), [selectedNoteId, notes]);

	const goToCustomers = () => {
		navigate('../', 'Kunder');
	};

	const handleCreated = () => {
		setModalOpen(false);
		refetch();
	};

	const deleteNote = (id: number) => async () => {
		await mutation.mutateAsync(id);
		refetch();
	};

	return (
		<>
			<MainContentLayout
				renderButtonBar={
					<ButtonBar>
						<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToCustomers} size='large'>
							Kunder
						</Button>
						<Button type='primary' size='large' icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
							Ny anteckning
						</Button>
					</ButtonBar>
				}>
				<Row>
					<Col sm={24} md={12}>
						<List<NoteType>
							loading={isLoading || isFetching}
							itemLayout='horizontal'
							pagination={{ position: 'bottom', align: 'start' }}
							dataSource={notes?.toJSON()}
							rowKey={'id'}
							renderItem={(note) => (
								<List.Item
									actions={[
										<Button key='view' type='link' onClick={() => setSelectedNoteId(note.id)}>
											Visa
										</Button>,
										<Popconfirm
											key='delete'
											title='Radera anteckningen'
											description='Är du säker på att du vill radera anteckningen?'
											onConfirm={deleteNote(note.id!)}
											okButtonProps={{ loading: mutation.isLoading }}
											okText='Ja'
											cancelText='Nej'>
											<Button type='link' danger>
												Radera
											</Button>
										</Popconfirm>
									]}>
									<List.Item.Meta title={note.title} description={<div className='line-clamp-2'>{note.content}</div>} />
								</List.Item>
							)}
						/>
					</Col>
					<Col sm={24} md={12}>
						{selectedNote && <NoteView note={selectedNote} />}
					</Col>
				</Row>
			</MainContentLayout>
			<NoteForm open={modalOpen} onCancel={() => setModalOpen(false)} onCreated={handleCreated} />
		</>
	);
};
