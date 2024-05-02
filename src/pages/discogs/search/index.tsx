import { useState } from 'react';
import { SearchSchema } from '../../../services/discogs/search/types';
import { SearchForm } from './components/SearchForm';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { Col, Row, Typography } from 'antd';
import { SearchResult } from './components/SearchResult';

export function Component() {
	const [searchCriteria, setSearchCriteria] = useState<SearchSchema | null>(null);

	return (
		<ContentLayout>
			<MainContentLayout noSpacing>
				<div className='py-4 px-5'>
					<Row>
						<Col sm={24} md={8}>
							<SearchForm setSearchCriteria={setSearchCriteria} />
						</Col>
					</Row>
				</div>
				<SearchResult searchCriteria={searchCriteria} />
			</MainContentLayout>
		</ContentLayout>
	);
}
