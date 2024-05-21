import { Button, Col, List, Row } from 'antd';
import { MainContentLayout } from '../../../../../components/layout/content-layout/MainContentLayout';
import { useLoaderData } from '../../../../../hooks/useLoaderData';
import { Customer } from '../../../../../services/customer/Customer';
import { useListNotes } from '../../../../../services/note/hooks/useListNotes';
import { NoteType } from '../../../../../services/note/types';
import { ButtonBar } from '../../../../../components/forms/buttonbar';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../hooks/useNavigate';
import { useMemo, useState } from 'react';
import { NoteCreate } from './create';
import { NoteView } from './view';
import { useSearchParams } from 'react-router-dom';

export const Notes = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedNoteId = searchParams.has('note') ? parseInt(searchParams.get('note')!) : undefined;
	const [modalOpen, setModalOpen] = useState(false);
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

	const viewNote = (id: number) => () => {
		searchParams.set('note', id.toString());
		setSearchParams(searchParams);
	};

	return (
		<>
			<MainContentLayout
				title='Anteckningar'
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
				<Row gutter={[16, 0]}>
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
										<Button key='view' type='link' onClick={viewNote(note.id!)}>
											Visa
										</Button>
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
			<NoteCreate open={modalOpen} onCancel={() => setModalOpen(false)} onCreated={handleCreated} />
		</>
	);
};