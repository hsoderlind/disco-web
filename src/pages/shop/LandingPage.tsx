import { Card, Col, Row } from 'antd';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';

export function Component() {
	return (
		<ContentLayout>
			<MainContentLayout>
				<Row gutter={[24, 24]}>
					<Col xs={24} xl={12}>
						<Card title='Bruttovolym'></Card>
					</Col>
					<Col xs={24} xl={12}>
						<Card title='Betalningar'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Fakturor'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Genomförda betalningar'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Misslyckade betalningar'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Nya kunder'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Volym per kund'></Card>
					</Col>
					<Col xs={24} lg={12} xl={8}>
						<Card title='Storkunder efter köpvolym'></Card>
					</Col>
				</Row>
			</MainContentLayout>
		</ContentLayout>
	);
}
