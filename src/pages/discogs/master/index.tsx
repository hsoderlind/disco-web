import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../types/common';
import { useFindMaster } from '../../../services/discogs/master/hooks/useFindMaster';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { LightboxImage } from '../../../components/lightbox/types';
import { MasterResultSchema } from '../../../services/discogs/master/types';
import { Lightbox } from '../../../components/lightbox';
import { useState } from 'react';
import { Button, Col, Descriptions, DescriptionsProps, Row, Typography } from 'antd';
import { TrackslistProps } from '../../../components/trackslist/types';
import { Trackslist } from '../../../components/trackslist';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { ReleaseStats } from '../components/release-stats';
import { ReleaseVersions } from '../components/release-versions';
import { ArtistSummary } from '../components/artist-summary';
import { CommonArtistSchema } from '../../../services/discogs/types';
import { PageLoader } from '../../../components/page-loader/PageLoader';
import { ArrowRightOutlined, ImportOutlined } from '@ant-design/icons';
import { AddToWantListButton } from '../components/toolbar/add-to-wantlist';
import { ImportButton } from '../components/toolbar/import-button';

export function Component() {
	const params = useParams<RouteParams>();
	const { data: master, isFetching, isLoading } = useFindMaster(parseInt(params.id!));
	const [lightboxOpen, setLightboxOpen] = useState(false);

	const images: LightboxImage[] = master
		? master.get<MasterResultSchema['images']>('images')?.map((image) => ({
				mainSrc: image.uri as string,
				thumbSrc: image.uri150 as string
		  }))
		: [];
	const primaryImage = master?.get<MasterResultSchema['images']>('images').find((image) => image.type === 'primary');

	const items: DescriptionsProps['items'] = [
		{
			key: 'genres',
			label: 'Genre',
			children: master?.get<MasterResultSchema['genres']>('genres')?.join(', ')
		},
		{
			key: 'styeles',
			label: 'Stil',
			children: master?.get<MasterResultSchema['styles']>('styles')?.join(', ')
		},
		{
			key: 'year',
			label: 'År',
			children: master?.get<string>('year')
		}
	];

	const tracks: TrackslistProps['tracks'] = master
		? master.get<MasterResultSchema['tracklist']>('tracklist')!.map((track) => ({
				position: track.position as string,
				title: track.title as string,
				duration: track.duration as string,
				artists: track.artists as CommonArtistSchema[]
		  }))
		: [];

	if (isLoading || isFetching) {
		return <PageLoader />;
	}

	return (
		<>
			<ContentLayout>
				<SidebarContentLayout enableShrink={false}>
					{typeof master !== 'undefined' ? (
						<>
							<ArtistSummary artists={master.get<CommonArtistSchema[]>('artists')} />
							<ReleaseStats releaseId={master.get('main_release')} />
						</>
					) : null}
				</SidebarContentLayout>
				<MainContentLayout
					renderToolbarExtraContent={
						master && (
							<>
								<ImportButton releaseId={master.get<number>('main_release')} />
								<AddToWantListButton releaseId={master.get<number>('main_release')} />
								<Button
									type='text'
									icon={<ArrowRightOutlined />}
									title='Se artikeln på Discogs'
									onClick={() => window.open(master?.get<string>('uri') as string, 'tab')}
								/>
							</>
						)
					}>
					<Row gutter={24} className='mb-5'>
						<Col md={5} className='text-center'>
							<img src={primaryImage?.resource_url} alt={master?.get('title')} />
							<Button className='mt-3' type='link' onClick={() => setLightboxOpen(true)}>
								Visa alla bilder
							</Button>
						</Col>
						<Col md={14}>
							<Typography.Title level={2}>{`${master?.get<MasterResultSchema['artists']>('artists')?.[0]
								.name} - ${master?.get<string>('title')}`}</Typography.Title>
							<Descriptions items={items} column={1} />
						</Col>
					</Row>
					<Row gutter={12} className='mb-5'>
						<Col md={19}>
							<Trackslist title='Låtlista' tracks={tracks} />
						</Col>
					</Row>
					<Row gutter={12} className='mb-5'>
						<Col md={24} style={{ height: 'max(50vh, 500px)' }}>
							<ReleaseVersions masterId={parseInt(params.id!)} />
						</Col>
					</Row>
				</MainContentLayout>
			</ContentLayout>
			<Lightbox open={lightboxOpen} images={images} onClose={() => setLightboxOpen(false)} />
		</>
	);
}
