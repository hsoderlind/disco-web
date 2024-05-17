import { Button, Card, Col, List, Row } from 'antd';
import { MainContentLayout } from '../../../../../../components/layout/content-layout/MainContentLayout';
import { useLoaderData } from '../../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../../services/customer/Customer';
import { useListNotes } from '../../../../../../services/note/hooks/useListNotes';
import { NoteType } from '../../../../../../services/note/types';
import { ButtonBar } from '../../../../../../components/forms/buttonbar';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../hooks/useNavigate';
import { useMemo, useState } from 'react';
import { NoteForm } from './form';
import { Dayjs } from 'dayjs';

export const Notes = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedNoteId, setSelectedNoteId] = useState<NoteType['id'] | undefined>();
	const navigate = useNavigate();
	const customer = useLoaderData<Customer>();
	const { data: notes, isLoading, isFetching, refetch } = useListNotes('customer', customer.getKey()!);

	const selectedNote = useMemo(() => notes?.find(selectedNoteId), [selectedNoteId, notes]);

	const goToCustomers = () => {
		navigate('../', 'Kunder');
	};

	const handleCreated = () => {
		setModalOpen(false);
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
										<Button type='link' onClick={() => setSelectedNoteId(note.id)}>
											Visa
										</Button>
									]}>
									<List.Item.Meta title={note.title} description={<div className='line-clamp-2'>{note.content}</div>} />
								</List.Item>
							)}
						/>
					</Col>
					<Col sm={24} md={12}>
						{selectedNote && (
							<Card
								title={selectedNote.get<string>('title')}
								extra={selectedNote.get<Dayjs>('created_at').format('L LT')}>
								<p className='white-space-pre-line'>{selectedNote.get<string>('content')}</p>
							</Card>
						)}
					</Col>
				</Row>
			</MainContentLayout>
			<NoteForm open={modalOpen} onCancel={() => setModalOpen(false)} onCreated={handleCreated} />
		</>
	);
};
