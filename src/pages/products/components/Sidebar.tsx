import { FC } from 'react';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { Badge, Menu, Tooltip } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../services/product/types';
import { IonIcon } from '@ionic/react';
import {
	barcodeOutline,
	createOutline,
	cubeOutline,
	documentsOutline,
	earthOutline,
	imagesOutline,
	optionsOutline,
	pricetagsOutline,
	swapHorizontalOutline,
	trendingUpOutline
} from 'ionicons/icons';

export const Sidebar: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const section = searchParams.get('section');
	const {
		formState: { errors }
	} = useFormContext<ProductSchemaType>();

	const hasSectionErrors = (fieldsToCheck: Array<keyof ProductSchemaType>) => {
		return Object.keys(errors).some((key) => fieldsToCheck.includes(key as keyof ProductSchemaType));
	};

	return (
		<SidebarContentLayout>
			{(shrinked) => (
				<Menu
					mode='inline'
					onClick={(e) => {
						searchParams.set('section', e.key);
						setSearchParams(searchParams);
					}}
					defaultSelectedKeys={[section!]}
					items={[
						{
							danger: hasSectionErrors(['name', 'categories', 'summary', 'description']),
							label: 'Beskrivning',
							key: 'description',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Beskrivning'}>
									<IonIcon
										size='small'
										md={createOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Beskrivning' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['condition', 'reference', 'barcodes']),
							label: 'Märkning',
							key: 'details',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Märkning'}>
									<IonIcon
										size='small'
										md={barcodeOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Märkning' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['product_attributes']),
							label: 'Features',
							key: 'features',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Features'}>
									<IonIcon
										size='small'
										md={optionsOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Features' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['price', 'tax_id', 'special_prices']),
							label: 'Pris',
							key: 'price',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Pris'}>
									<IonIcon
										size='small'
										md={pricetagsOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Pris' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['images']),
							label: 'Bilder',
							key: 'images',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Bilder'}>
									<IonIcon
										size='small'
										md={imagesOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Bilder' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['files']),
							label: 'Filer',
							key: 'files',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Filer'}>
									<IonIcon
										size='small'
										md={documentsOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Filer' })}
									/>
								</Tooltip>
							)
						},
						{
							danger: hasSectionErrors(['stock']),
							label: 'Lager',
							key: 'stock',
							icon: (
								<Tooltip placement='right' title={!shrinked ? '' : 'Lager'}>
									<IonIcon
										size='small'
										md={cubeOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Lager' })}
									/>
								</Tooltip>
							)
						},
						{
							label: (
								<Badge.Ribbon text='Kommer snart' color='lime' style={{ marginInlineEnd: '10px' }}>
									Frakt
								</Badge.Ribbon>
							),
							icon: <IonIcon size='small' md={earthOutline} aria-hidden />,
							key: 'shipping',
							disabled: true
						},
						{
							label: (
								<Badge.Ribbon text='Kommer snart' color='lime' style={{ marginInlineEnd: '10px' }}>
									Korsförsäljning
								</Badge.Ribbon>
							),
							icon: <IonIcon size='small' md={swapHorizontalOutline} aria-hidden />,
							key: 'xsell',
							disabled: true
						},
						{
							label: (
								<Badge.Ribbon text='Kommer snart' color='lime' style={{ marginInlineEnd: '10px' }}>
									Uppförsäljning
								</Badge.Ribbon>
							),
							icon: <IonIcon size='small' md={trendingUpOutline} aria-hidden />,
							key: 'upsell',
							disabled: true
						}
					]}
				/>
			)}
		</SidebarContentLayout>
	);
};
