import { Button, Col, List, Row } from 'antd';
import { MainContentLayout } from '../layout/content-layout/MainContentLayout';
import { useListNotes } from '../../services/note/hooks/useListNotes';
import { NoteType } from '../../services/note/types';
import { useMemo, useState } from 'react';
import { NoteCreate } from './create';
import { NoteView } from './view';
import { useSearchParams } from 'react-router-dom';
import { NotesProps } from './types';

export const Notes = ({ renderButtonBar, resource, resourceId }: NotesProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedNoteId = searchParams.has('note') ? parseInt(searchParams.get('note')!) : undefined;
	const [modalOpen, setModalOpen] = useState(false);
	const { data: notes, isLoading, isFetching, refetch } = useListNotes(resource, resourceId);

	const selectedNote = useMemo(() => notes?.find(selectedNoteId), [selectedNoteId, notes]);

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
					<>
						{renderButtonBar?.({
							closeModal: () => setModalOpen(false),
							openModal: () => setModalOpen(true)
						})}
					</>
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
			<NoteCreate
				resource={resource}
				resourceId={resourceId}
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				onCreated={handleCreated}
			/>
		</>
	);
};
