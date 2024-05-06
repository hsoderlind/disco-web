import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../types/common';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { LightboxImage } from '../../../components/lightbox/types';
import { Lightbox } from '../../../components/lightbox';
import { useState } from 'react';
import { Button, Card, Col, Descriptions, DescriptionsProps, Row, Typography } from 'antd';
import { TrackslistProps } from '../../../components/trackslist/types';
import { Trackslist } from '../../../components/trackslist';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { ReleaseStats } from '../components/release-stats';
import { ReleaseVersions } from '../components/release-versions';
import { ArtistSummary } from '../components/artist-summary';
import {
	CommonArtistSchema,
	CommonLabelSchema,
	CompanySchema,
	FormatSchema,
	IdentifierSchema
} from '../../../services/discogs/types';
import { PageLoader } from '../../../components/page-loader/PageLoader';
import { ArrowRightOutlined, ImportOutlined } from '@ant-design/icons';
import { AddToWantListButton } from '../components/toolbar/add-to-wantlist';
import { useFindRelease } from '../../../services/discogs/release/hooks/useFindRelease';
import { ReleaseResponseSchema } from '../../../services/discogs/release/types';
import { LabelSummary } from '../components/label-summary';
import { FormatSummary } from '../components/format-summary';
import { PriceSuggestions } from '../components/price-suggestions';
import { ReleaseStats as MarketplaceReleaseStats } from '../components/marketplace/ReleaseStats';

export function Component() {
	const params = useParams<RouteParams>();
	const { data: release, isFetching, isLoading } = useFindRelease(parseInt(params.id!));
	const [lightboxOpen, setLightboxOpen] = useState(false);

	const images: LightboxImage[] = release
		? release.get<ReleaseResponseSchema['images']>('images')?.map((image) => ({
				mainSrc: image.uri as string,
				thumbSrc: image.uri150 as string
		  }))
		: [];
	const primaryImage = release
		?.get<ReleaseResponseSchema['images']>('images')
		.find((image) => image.type === 'primary');

	const items: DescriptionsProps['items'] = [
		{
			key: 'release_id',
			label: 'Release ID hos Discogs',
			children: <Typography.Text copyable>{params.id}</Typography.Text>
		},
		{
			key: 'labels',
			label: 'Label',
			children: release && <LabelSummary labels={release.get<CommonLabelSchema[]>('labels')} />
		},
		{
			key: 'formats',
			label: 'Format',
			children: release && <FormatSummary formats={release.get<FormatSchema[]>('formats')} />
		},
		{
			key: 'country',
			label: 'Land',
			children: release?.get<string>('country')
		},
		{
			key: 'genres',
			label: 'Genre',
			children: release?.get<ReleaseResponseSchema['genres']>('genres')?.join(', ')
		},
		{
			key: 'styeles',
			label: 'Stil',
			children: release?.get<ReleaseResponseSchema['styles']>('styles')?.join(', ')
		},
		{
			key: 'year',
			label: 'År',
			children: release?.get<string>('year')
		}
	];

	const companies: DescriptionsProps['items'] =
		release && release.get<CompanySchema[]>('companies')
			? release.get<CompanySchema[]>('companies').map((company, index) => ({
					key: `company-${index}`,
					label: company.entity_type_name,
					children: `${company.name}${company.catno ? ` - ${company.catno}` : ''}`
			  }))
			: [];

	const credits: DescriptionsProps['items'] =
		release && release.get<CommonArtistSchema[]>('extraartists')
			? release.get<CommonArtistSchema[]>('extraartists').map((artist, index) => ({
					key: `artist-${index}`,
					label: artist.role,
					children: `${artist.name}${artist.tracks ? ` (spår: ${artist.tracks})` : ''}`
			  }))
			: [];

	const tracks: TrackslistProps['tracks'] = release
		? release.get<ReleaseResponseSchema['tracklist']>('tracklist')!.map((track) => ({
				position: track.position as string,
				title: track.title as string,
				duration: track.duration as string,
				artists: track.artists as CommonArtistSchema[]
		  }))
		: [];

	const identifiers: DescriptionsProps['items'] = release?.get<IdentifierSchema[]>('identifiers')
		? release.get<IdentifierSchema[]>('identifiers').map((identifier, index) => ({
				key: `identifier-${index}`,
				label: identifier.type,
				children: identifier.value
		  }))
		: [];

	if (isLoading || isFetching) {
		return <PageLoader />;
	}

	return (
		<>
			<ContentLayout>
				<SidebarContentLayout enableShrink={false}>
					{typeof release !== 'undefined' ? (
						<>
							<ArtistSummary artists={release.get<CommonArtistSchema[]>('artists')} />
							<PriceSuggestions releaseId={release.get('id')} />
							<MarketplaceReleaseStats releaseId={release.get('id')} />
							<ReleaseStats releaseId={release.get('id')} />
						</>
					) : null}
				</SidebarContentLayout>
				<MainContentLayout
					renderToolbarExtraContent={
						<>
							<Button type='text' icon={<ImportOutlined />} title='Importera artikeln' />
							{release && <AddToWantListButton releaseId={release.get<number>('id')!} />}
							<Button
								type='text'
								icon={<ArrowRightOutlined />}
								title='Se artikeln på Discogs'
								onClick={() => window.open(release?.get<string>('uri') as string, 'tab')}
							/>
						</>
					}>
					<Row gutter={24} className='mb-5'>
						<Col md={5} className='text-center'>
							<img
								src={primaryImage?.resource_url ?? release?.get('thumb')}
								alt={release?.get('title')}
								className='block-center'
							/>
							<Button className='mt-3' type='link' onClick={() => setLightboxOpen(true)}>
								Visa alla bilder
							</Button>
						</Col>
						<Col md={19}>
							<Typography.Title level={2}>{`${release?.get<ReleaseResponseSchema['artists']>('artists')?.[0]
								.name} - ${release?.get<string>('title')}`}</Typography.Title>
							<Descriptions size='middle' items={items} column={1} />
						</Col>
					</Row>
					{release?.get('notes') && (
						<Row gutter={12} className='mb-5'>
							<Col md={19}>
								<Card style={{ whiteSpace: 'pre-line' }}>{release!.get<string>('notes')}</Card>
							</Col>
						</Row>
					)}
					<Row gutter={12} className='mb-5'>
						<Col md={19}>
							<Trackslist title='Låtlista' tracks={tracks} />
						</Col>
					</Row>
					<Row gutter={12} className='mb-5'>
						<Col md={19}>
							<Descriptions column={1} title='Bolag' items={companies} />
						</Col>
					</Row>
					<Row gutter={12} className='mb-5'>
						<Col md={19}>
							<Descriptions column={1} title='Omnämnande' items={credits} />
						</Col>
					</Row>
					{identifiers.length > 0 && (
						<Row gutter={12} className='mb-5'>
							<Col md={19}>
								<Descriptions column={1} title='Streckkod och andra identifieringar' items={identifiers} />
							</Col>
						</Row>
					)}
					<Row gutter={12} className='mb-5'>
						<Col md={24} style={{ height: 'max(50vh, 500px)' }}>
							<ReleaseVersions masterId={release!.get('master_id')} />
						</Col>
					</Row>
				</MainContentLayout>
			</ContentLayout>
			<Lightbox open={lightboxOpen} images={images} onClose={() => setLightboxOpen(false)} />
		</>
	);
}
