import { SearchSchema, searchSchema } from '../../../services/discogs/search/types';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { Col, Form, Input, Pagination, PaginationProps, Row, Tabs, TabsProps } from 'antd';
import { useForm } from '../../../hooks/useForm';
import { useSearch } from '../../../services/discogs/search/hooks/useSearch';
import { SubmitHandler } from 'react-hook-form';
import FormItem from '../../../lib/form/FormItem';
import { useSearchParams } from 'react-router-dom';
import { RecordGrid } from './components/RecordGrid';
import { SearchProps } from 'antd/es/input';
import { useEffect } from 'react';

type Type = 'master' | 'release' | 'artist' | 'label';

export function Component() {
	const [searchParams, setSearchParams] = useSearchParams({ tab: 'master' });
	const activeKey = searchParams.get('tab') as Type;
	const { control, handleSubmit } = useForm<SearchSchema>({
		schema: searchSchema
	});
	const mutation = useSearch();

	const onSubmit: SubmitHandler<SearchSchema> = (values) => {
		mutation.mutate({ ...values, type: activeKey });
	};

	const handleSearch: SearchProps['onSearch'] = () => handleSubmit(onSubmit)();

	const tabs: TabsProps['items'] = [
		{
			key: 'master',
			label: 'Master'
		},
		{
			key: 'release',
			label: 'Releaser'
		},
		{
			key: 'artist',
			label: 'Artister/Grupper'
		},
		{
			key: 'label',
			label: 'Label'
		}
	];

	const handleTabClick: TabsProps['onTabClick'] = (tab) => setSearchParams({ tab });

	const handlePaginationChange: PaginationProps['onChange'] = (page, pageSize) => {
		mutation.mutate({ ...mutation.data?.criteria, page, per_page: pageSize });
	};

	useEffect(() => {
		if (mutation.data && mutation.data.criteria) {
			mutation.mutate({ ...mutation.data.criteria, type: activeKey });
		}
	}, [activeKey]);

	return (
		<ContentLayout>
			<MainContentLayout noSpacing>
				<div className='pb-4 px-4'>
					<Row>
						<Col sm={24} md={8}>
							<Form layout='horizontal'>
								<FormItem control={control} name='query' label='' noStyle>
									<Input.Search placeholder='Skriv din sökfras här...' onSearch={handleSearch} enterButton />
								</FormItem>
							</Form>
						</Col>
					</Row>
				</div>
				<Tabs activeKey={activeKey!} items={tabs} onTabClick={handleTabClick} style={{ paddingInline: '1rem' }} />
				<div className='px-4 pb-4'>
					<Pagination
						total={mutation.data?.items}
						pageSize={mutation.data?.itemsPerPage}
						showTotal={(total) => `Totalt ${total} träffar`}
						onChange={handlePaginationChange}
					/>
				</div>
				{(activeKey === 'master' || activeKey === 'release') && (
					<RecordGrid searchResult={mutation.data} isLoading={mutation.isLoading} isSuccess={mutation.isSuccess} />
				)}
			</MainContentLayout>
		</ContentLayout>
	);
}
