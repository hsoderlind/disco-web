import { Button, Collapse, CollapseProps, Menu, MenuProps, Modal, Typography } from 'antd';
import classes from './toolpanel.module.scss';
import { CloseOutlined, ExclamationOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Icon } from './Icon';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import clsx from 'clsx';
import { useNavigate } from '../../../hooks/useNavigate';
import { useShopPath } from '../../../hooks/useShopPath';

export const Toolpanel = () => {
	const [panelState, setPanelState] = useLocalStorage<'expanded' | 'collapsed'>('discogs.toolpanel', 'collapsed');
	const navigate = useNavigate();
	const shopPath = useShopPath();

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'search-search':
				Modal.confirm({
					title: 'Du kommer lämna sidan',
					icon: <ExclamationOutlined />,
					content:
						'Du kommer dirigeras om till en annan vy så försäkra dig om att du har sparat ditt arbete innan du fortsätter.',
					cancelText: 'Avbryt',
					okText: 'Fortsätt',
					onOk: () => navigate(`${shopPath}/discogs/search`, 'Sök i Discogs')
				});
				break;
		}
	};

	const items: CollapseProps['items'] = [
		{
			key: 'search',
			label: 'Sök',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'search-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Sök i Discogs databas efter artiklar. Du kan sedan importera data om dessa artiklar och koppla till
										din produkt för effektivare administrering.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'search-search',
								label: 'Sök i databasen',
								icon: <SearchOutlined />
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'wantlist',
			label: 'Önskelista',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'wantlist-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Se, ändra och lägg till artiklar på din önskelista. När en kund efterfrågar en viss artikel kan du
										lägga till den i din önskelista och få meddelande om när den finns tillgänglig hos Discogs.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'wantlist-listItems',
								label: 'Visa önskelistan'
							},
							{
								key: 'wantlist-addRelease',
								label: 'Lägg till artikel'
							},
							{
								key: 'wantlist-deleteRelease',
								label: 'Radera artikel'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'marketplace',
			label: 'Marknadsplats',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'marketplace-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Sälj dina artiklar på Discogs och administrera beställningarna direkt i{' '}
										{import.meta.env.VITE_APP_SHORT_NAME}. Du kan även få prisförslag på dina artiklar.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'marketplace-listing',
								label: 'Listor',
								type: 'group',
								children: [
									{
										key: 'marketplace-getListing',
										label: 'Se lista'
									},
									{
										key: 'marketplace-createListing',
										label: 'Skapa lista'
									},
									{
										key: 'marketplace-updateListing',
										label: 'Redigera lista'
									},
									{
										key: 'marketplace-deleteListing',
										label: 'Radera lista'
									}
								]
							},
							{
								key: 'marketplace-orders',
								label: 'Beställningar',
								type: 'group',
								children: [
									{
										key: 'marketplace-listOrders',
										label: 'Lista beställningar'
									},
									{
										key: 'marketplace-getOrder',
										label: 'Visa beställning'
									},
									{
										key: 'marketplace-editOrder',
										label: 'Administrera beställning'
									},
									{
										key: 'marketplace-listOrderMessages',
										label: 'Lista beställningsmeddelanden'
									},
									{
										key: 'marketplace-addOrderMessage',
										label: 'Lägg till beställningsmeddelande'
									},
									{
										key: 'marketplace-getFee',
										label: 'Visa avgift'
									}
								]
							},
							{
								key: 'marketplace-getPriceSuggestions',
								label: 'Visa prisförslag'
							},
							{
								key: 'marketplace-getReleaseStats',
								label: 'Visa statistik över release'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'collection',
			label: 'Samling',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'collection-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Administrera din samling hos Discogs. Du kan även synkronisera hela eller delar av produktkatalogen
										på {import.meta.env.VITE_APP_SHORT_NAME} med Discogs.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'collection-folders',
								label: 'Mappar',
								type: 'group',
								children: [
									{
										key: 'collection-getFolders',
										label: 'Visa mappar'
									},
									{
										key: 'collection-createFolder',
										label: 'Skapa mapp'
									},
									{
										key: 'collection-getFolder',
										label: 'Visa mapp'
									},
									{
										key: 'collection-editFolder',
										label: 'Redigera mapp'
									},
									{
										key: 'collection-deleteFolder',
										label: 'Radera mapp'
									},
									{
										key: 'collection-listItemsByFolder',
										label: 'Visa artiklar i mapp'
									},
									{
										key: 'collection-addReleaseToFolder',
										label: 'Lägg till release i mapp'
									}
								]
							},
							{
								key: 'collection-release',
								label: 'Release',
								type: 'group',
								children: [
									{
										key: 'collection-listItemsByRelease',
										label: 'Visa artiklar per release'
									},
									{
										key: 'collection-addReleaseToFolder',
										label: 'Lägg till release i mapp'
									},
									{
										key: 'collection-editRelease',
										label: 'Redigera release'
									},
									{
										key: 'collection-deleteReleaseInstance',
										label: 'Radera release'
									}
								]
							},
							{
								key: 'collection-custom-fields',
								label: 'Egna fält',
								type: 'group',
								children: [
									{
										key: 'collection-listCustomFields',
										label: 'Visa egna fält'
									},
									{
										key: 'collection-editFieldByInstance',
										label: 'Redigera instans av eget fält'
									}
								]
							},
							{
								key: 'collection-getCollectionValue',
								label: 'Se värde av samling'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'inventory',
			label: 'Lager',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'inventory-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>Få en förteckning över dina inventarier hos Discogs.</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'inventory-exportInventory',
								label: 'Exportera lager'
							},
							{
								key: 'inventory-listInventoryExports',
								label: 'Lista lagerexporter'
							},
							{
								key: 'inventory-getExport',
								label: 'Hämta export'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'artist',
			label: 'Artist',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'artist-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Få information om en artist eller en grupp och se dess releaser som finns tillgänglig i Discogs.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'artist-getArtist',
								label: 'Visa artist/grupp'
							},
							{
								key: 'artist-getReleases',
								label: 'Se releaser'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'master',
			label: 'Master',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'master-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: <Typography.Paragraph>Se information om masters.</Typography.Paragraph>
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'master-getMaster',
								label: 'Visa master'
							},
							{
								key: 'master-listReleaseVersions',
								label: 'Lista release-versioner'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'release',
			label: 'Release',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'release-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: <Typography.Paragraph>Få information om releaser.</Typography.Paragraph>
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'release-getRelease',
								label: 'Visa release'
							},
							{
								key: 'release-getRating',
								label: 'Se din värdering'
							},
							{
								key: 'release-updateReleaseRating',
								label: 'Uppdatera din värdering'
							},
							{
								key: 'release-deleteRating',
								label: 'Radera din värdering'
							},
							{
								key: 'release-getCommunityReleaseRating',
								label: 'Visa samlad värdering'
							},
							{
								key: 'release-getReleaseStats',
								label: 'Release statistik'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'label',
			label: 'Label',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'label-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: (
									<Typography.Paragraph>
										Få information om skivbolag, bolag, inspelningsstudio, plats eller annan enhet som är involverad i
										en artist/grupp eller release.
									</Typography.Paragraph>
								)
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'label-getLabel',
								label: 'Visa label'
							},
							{
								key: 'label-getReleases',
								label: 'Visa release'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		},
		{
			key: 'list',
			label: 'Lista',
			children: (
				<>
					<Collapse
						className='mb-4'
						size='small'
						items={[
							{
								key: 'list-info',
								label: 'Info',
								extra: <InfoCircleOutlined />,
								children: <Typography.Paragraph>Få information om en användares listor.</Typography.Paragraph>
							}
						]}
					/>
					<Menu
						theme='dark'
						items={[
							{
								key: 'list-getLists',
								label: 'Se listor'
							},
							{
								key: 'list-getList',
								label: 'Se lista'
							}
						]}
						onClick={handleClick}
					/>
				</>
			)
		}
	];

	return (
		<>
			<Button
				type='text'
				icon={<Icon />}
				onClick={() => setPanelState('expanded')}
				title='Visa Discogs instrumentpanel'
			/>
			<aside className={clsx(classes['toolpanel'], { [classes['toolpanel--expanded']]: panelState === 'expanded' })}>
				<header>
					<Button type='text' icon={<CloseOutlined />} onClick={() => setPanelState('collapsed')} />
					<svg
						xmlns='http://www.w3.org/2000/svg'
						version='1.1'
						id='Layer_1'
						x='0px'
						y='0px'
						viewBox='0 0 1999.9999 725.04374'
						enable-background='new 0 0 456.7 165.6'
						xmlSpace='preserve'
						className={classes['toolpanel__logo']}>
						<defs id='defs2308' />
						<g id='g2881' transform='matrix(4.3782837,0,0,4.3782837,-237.7408,-107.70578)'>
							<g id='g2303' transform='translate(54.3,24.6)'>
								<path
									id='path2253'
									d='m 277.3,32.3 c -0.2,0 -0.3,0 -0.5,-0.1 0.2,0.1 0.4,0.1 0.5,0.1 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2255'
									d='M 27.3,0 H 0 v 136.7 h 32.1 c 16.8,0 28.5,-5 35.2,-14.9 6.7,-9.9 10,-28 10,-54.1 C 77.3,42 74,24.3 67.3,14.6 60.6,4.9 47.3,0 27.3,0 Z m 18,115 c -2.4,4.6 -6.7,6.8 -12.9,6.8 H 27.5 V 15 h 4.9 c 6.3,0 10.6,3.9 13,11.6 2.4,7.7 3.6,21.9 3.6,42.5 -0.1,26 -1.3,41.3 -3.7,45.9 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<rect
									id='rect2257'
									height='23.9'
									width='25.799999'
									y='0.1'
									x='82.599998'
									className={classes['toolpanel__logo__fill']}
								/>
								<rect
									id='rect2259'
									height='104.7'
									width='25.799999'
									y='32'
									x='82.599998'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2261'
									d='M 151.7,77.6 C 143.5,70.4 138.6,65.5 137,62.8 c -1.6,-2.7 -2.4,-5.4 -2.4,-8.3 0,-2.4 0.7,-4.2 2.1,-5.5 1.4,-1.3 3.1,-1.9 5.2,-1.9 2.5,0 4.4,1 5.8,2.9 1.4,1.9 2.1,4.5 2.1,7.6 h 20.6 c 0,-8.6 -2.5,-15.3 -7.4,-20 -4.9,-4.7 -12,-7 -21.3,-7 -8.7,0 -15.7,2.3 -21,6.8 -5.3,4.6 -8,10.7 -8,18.4 0,7.4 1.1,13.6 3.2,18.6 2.1,5 7.1,10.9 15,17.8 6.2,5.3 10.7,9.5 13.4,12.4 2.7,2.9 4.1,5.6 4.1,8.1 0,2.7 -0.6,4.7 -1.9,6.1 -1.3,1.4 -3.2,2 -5.8,2 -2.7,0 -4.7,-0.9 -6.1,-2.6 -1.4,-1.7 -2.1,-4.5 -2.1,-8.3 h -20.9 c 0,9.2 2.5,16.2 7.5,20.8 5,4.6 12.4,6.9 22.3,6.9 9.2,0 16.4,-2.5 21.7,-7.4 5.3,-4.9 7.9,-11.8 7.9,-20.7 0,-5.7 -1.4,-10.9 -4.2,-15.5 C 164,89.4 159,84 151.7,77.6 Z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2263'
									d='m 452.6,94.1 c -2.8,-4.6 -7.8,-10.1 -15,-16.4 -8.2,-7.2 -13.1,-12.1 -14.7,-14.8 -1.6,-2.7 -2.4,-5.4 -2.4,-8.3 0,-2.4 0.7,-4.2 2.1,-5.5 1.4,-1.3 3.1,-1.9 5.2,-1.9 2.5,0 4.4,1 5.8,2.9 1.4,1.9 2.1,4.5 2.1,7.6 h 20.6 c 0,-8.6 -2.5,-15.3 -7.4,-20 -4.9,-4.7 -12,-7 -21.3,-7 -8.7,0 -15.7,2.3 -21,6.8 -5.3,4.6 -8,10.7 -8,18.4 0,7.4 1.1,13.6 3.2,18.6 2.1,5 7.1,10.9 15,17.8 6.2,5.3 10.7,9.5 13.4,12.4 2.7,2.9 4.1,5.6 4.1,8.1 0,2.7 -0.6,4.7 -2,6.1 -1.3,1.4 -3.2,2 -5.8,2 -2.7,0 -4.7,-0.9 -6.1,-2.6 -1.4,-1.7 -2.1,-4.5 -2.1,-8.3 h -20.9 c 0,9.2 2.5,16.2 7.5,20.8 5,4.6 12.4,6.9 22.3,6.9 9.2,0 16.4,-2.5 21.7,-7.4 5.3,-4.9 7.9,-11.8 7.9,-20.7 -0.1,-5.8 -1.5,-10.9 -4.2,-15.5 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2265'
									d='M 262,86.4 C 262,77.9 268.9,71 277.4,71 v 0 c 8.5,0 15.4,6.9 15.4,15.4 v 0 c 0,8.5 -6.9,15.4 -15.4,15.4 v 0 c -8.5,0 -15.4,-6.9 -15.4,-15.4 z m 0.7,0 c 0,8.1 6.6,14.7 14.7,14.7 v 0 c 8.1,0 14.7,-6.6 14.7,-14.7 v 0 c 0,-8.1 -6.6,-14.7 -14.7,-14.7 v 0 c -8.2,0 -14.7,6.6 -14.7,14.7 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2267'
									d='m 279.8,86.4 c 0,1.3 -1.1,2.4 -2.4,2.4 -1.3,0 -2.4,-1.1 -2.4,-2.4 0,-1.3 1.1,-2.4 2.4,-2.4 1.3,0 2.4,1.1 2.4,2.4 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2269'
									d='m 225,110.7 h -9.7 c -0.4,4.5 -1.1,7.4 -2.2,8.8 -1.1,1.4 -2.8,2 -5.1,2 -3.7,0 -6.1,-2.2 -7.1,-6.5 -1.1,-4.3 -1.6,-14.6 -1.6,-30.9 0,-14.1 0.5,-23.8 1.4,-29.2 0.9,-5.4 3.3,-8.1 7,-8.1 2.2,0 3.8,0.9 4.7,2.8 0.9,1.9 1.4,6 1.4,12.4 h 11.3 c 2.5,-5.2 5.6,-10 9.5,-14.2 -1.2,-3.7 -3.1,-6.9 -5.5,-9.4 -5,-5.2 -12.2,-7.8 -21.5,-7.8 -11.7,0 -20.5,4.5 -26.3,13.5 -5.8,9 -8.7,22.3 -8.7,40 0,17.8 2.8,31.2 8.4,40.1 5.6,9 13.8,13.5 24.7,13.5 9.6,0 16.8,-2.2 21.6,-6.6 2.4,-2.2 4.1,-4.9 5.3,-8.3 -3,-3.7 -5.5,-7.8 -7.6,-12.1 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<path
									id='path2271'
									d='m 334.9,86.5 c 0,10.2 -2.6,19.7 -7.3,28 1.6,5.9 3.9,10.4 6.9,13.6 4.1,4.2 9.8,6.3 17.1,6.3 4.3,0 8.1,-0.6 11.3,-1.7 3.2,-1.1 5.4,-2.6 6.5,-4.4 0.1,1 0.2,2 0.2,2.8 0.1,0.8 0.1,1.6 0.1,2.3 0,5.5 -1.2,9.6 -3.7,12.4 -2.5,2.8 -6.3,4.3 -11.5,4.3 -3.4,0 -7.2,-0.4 -11.3,-1.2 -4.1,-0.8 -7.5,-1.7 -10.1,-2.9 l -3.2,14.3 c 3.9,1.8 8.2,3.1 13,4 4.8,0.9 9.5,1.3 14.1,1.3 11.2,0 20,-2.8 26.6,-8.4 6.5,-5.6 9.8,-13.5 9.8,-23.7 V 32 h -25.7 v 2.5 c -2.3,-1.4 -4.6,-2.4 -6.9,-3 -2.3,-0.6 -5,-0.9 -8.1,-0.9 -6.3,0 -11.6,1.9 -15.9,5.8 -4.4,3.9 -7.5,9.3 -9.4,16.1 -0.3,1.2 -0.7,2.6 -1,4.3 5.4,8.7 8.4,18.8 8.5,29.7 m 33,30.8 c -1.1,0.9 -2.2,1.5 -3.3,1.9 -1.1,0.4 -2.6,0.6 -4.4,0.6 -2.4,0 -4.2,-0.7 -5.5,-2.1 -1.3,-1.4 -2.1,-3.7 -2.4,-6.9 -0.3,-3.3 -0.6,-7.5 -0.8,-12.5 -0.2,-5 -0.3,-10.3 -0.3,-15.9 0,-3.6 0.1,-7.6 0.3,-12.3 0.2,-4.6 0.5,-8.9 0.9,-12.9 0.4,-3.9 1.2,-6.5 2.6,-7.9 1.4,-1.4 3.5,-2.1 6.3,-2.1 1,0 2.2,0.2 3.5,0.4 1.3,0.3 2.4,0.7 3.1,1.1 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
								<g id='g2299'>
									<path
										id='path2273'
										d='m 277.4,66.3 c -11.1,0 -20.1,9 -20.1,20.1 0,5.7 2.4,10.8 6.1,14.4 0,0 0,0 -0.1,-0.1 l -5.2,5.7 c 1.8,1.8 3.9,3.3 6.1,4.5 l 3.8,-6.7 v 0 c 2.8,1.5 6,2.3 9.3,2.3 11.1,0 20,-9 20,-20.1 0,-5.4 -2.1,-10.2 -5.5,-13.8 l 5.3,-5.7 c -1.8,-1.8 -3.8,-3.4 -6,-4.7 l -3.7,6.8 c -3,-1.7 -6.4,-2.7 -10,-2.7 z'
										inkscape:connector-curvature='0'
										style={{ fill: 'none' }}
									/>
									<path
										id='path2275'
										d='m 251.5,113.6 -5.3,5.8 c 2.8,2.7 6,5 9.5,6.9 l 3.9,-6.9 c -3.1,-1.6 -5.7,-3.5 -8.1,-5.8 z'
										inkscape:connector-curvature='0'
										style={{ fill: 'none' }}
									/>
									<path
										id='path2277'
										d='m 303.8,59.7 5.3,-5.8 c -2.9,-2.8 -6.1,-5.2 -9.6,-7.2 l -3.8,6.9 c 3,1.7 5.7,3.8 8.1,6.1 z'
										inkscape:connector-curvature='0'
										style={{ fill: 'none' }}
									/>
									<path
										id='path2279'
										d='m 297.8,66.2 5.3,-5.7 c -2.3,-2.3 -4.9,-4.3 -7.8,-5.9 l -3.8,6.8 c 2.4,1.3 4.5,2.9 6.3,4.8 z'
										inkscape:connector-curvature='0'
										style={{ fill: 'none' }}
									/>
									<path
										id='path2281'
										d='m 257.5,107.1 -5.3,5.7 c 2.3,2.2 4.9,4.1 7.8,5.7 l 3.8,-6.8 c -2.3,-1.2 -4.5,-2.8 -6.3,-4.6 z'
										inkscape:connector-curvature='0'
										style={{ fill: 'none' }}
									/>
									<path
										id='path2283'
										d='m 249.6,86.4 c 0,7.9 3.3,14.9 8.5,20 l 5.2,-5.7 c 0,0 0,0 0.1,0.1 -3.8,-3.6 -6.1,-8.7 -6.1,-14.4 0,-11.1 9,-20.1 20.1,-20.1 3.7,0 7.1,1 10,2.7 l 3.7,-6.8 c -4.1,-2.3 -8.7,-3.6 -13.7,-3.6 -15.3,0 -27.8,12.5 -27.8,27.8 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2285'
										d='m 297.4,86.4 c 0,11.1 -9,20.1 -20,20.1 -3.4,0 -6.5,-0.8 -9.3,-2.3 v 0 l -3.8,6.7 c 3.9,2.1 8.4,3.3 13.1,3.3 15.3,0 27.8,-12.5 27.8,-27.8 0,-7.6 -3.1,-14.5 -8,-19.5 l -5.3,5.7 c 3.4,3.6 5.5,8.4 5.5,13.8 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2287'
										d='m 240.8,86.4 c 0,10.4 4.4,19.8 11.4,26.5 l 5.3,-5.7 c -5.5,-5.2 -8.9,-12.6 -8.9,-20.7 0,-15.9 12.9,-28.8 28.8,-28.8 5.2,0 10,1.4 14.2,3.8 l 3.8,-6.8 C 290.1,51.7 284,50 277.4,50 257.2,49.8 240.8,66.2 240.8,86.4 Z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2289'
										d='m 306.1,86.4 c 0,15.9 -12.9,28.8 -28.8,28.8 -4.9,0 -9.5,-1.2 -13.6,-3.4 l -3.8,6.8 c 5.2,2.8 11.1,4.4 17.4,4.4 20.2,0 36.6,-16.4 36.6,-36.6 0,-10.1 -4.1,-19.3 -10.8,-25.9 l -5.3,5.7 c 5.2,5.2 8.3,12.3 8.3,20.2 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2291'
										d='m 314.9,86.4 c 0,20.7 -16.9,37.6 -37.6,37.6 -6.5,0 -12.6,-1.6 -17.9,-4.5 l -3.9,6.9 c 6.5,3.5 13.9,5.6 21.8,5.6 25.1,0 45.4,-20.4 45.4,-45.4 0,-12.7 -5.2,-24.2 -13.6,-32.4 l -5.3,5.8 c 6.9,6.5 11.1,16 11.1,26.4 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2293'
										d='m 231.9,86.4 c 0,13 5.5,24.7 14.2,33 l 5.3,-5.8 c -7.2,-6.8 -11.7,-16.5 -11.7,-27.2 0,-20.7 16.9,-37.6 37.6,-37.6 6.7,0 13,1.8 18.4,4.9 l 3.8,-6.9 C 292.9,43.1 285.3,41 277.3,41 c -25,-0.1 -45.4,20.3 -45.4,45.4 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2295'
										d='m 315.1,47.6 -5.2,5.6 c 8.6,8.4 14,20.2 14,33.1 0,25.6 -20.8,46.4 -46.4,46.4 -8.1,0 -15.6,-2.1 -22.2,-5.7 l -3.9,6.9 c 7.7,4.2 16.6,6.7 26,6.7 29.9,0 54.2,-24.3 54.2,-54.2 -0.1,-15.2 -6.4,-28.9 -16.5,-38.8 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
									<path
										id='path2297'
										d='m 230.9,86.4 c 0,-25.6 20.8,-46.4 46.4,-46.4 8.2,0 16,2.2 22.7,6 l 3.7,-6.7 C 296.1,35 287.4,32.5 278.1,32.4 h -0.9 c -29.8,0 -53.9,24 -54.2,53.7 v 0 0.5 c 0,15.5 6.6,29.5 17.1,39.4 l 5.4,-5.8 c -9,-8.6 -14.6,-20.5 -14.6,-33.8 z'
										inkscape:connector-curvature='0'
										className={classes['toolpanel__logo__fill']}
									/>
								</g>
								<path
									id='path2301'
									d='m 442.1,22 c 0.4,-0.8 0.9,-1.5 1.5,-2.1 0.6,-0.6 1.4,-1 2.2,-1.4 0.8,-0.3 1.7,-0.5 2.6,-0.5 0.9,0 1.8,0.2 2.6,0.5 0.8,0.3 1.6,0.8 2.2,1.4 0.6,0.6 1.1,1.3 1.5,2.1 0.4,0.8 0.6,1.8 0.6,2.8 0,1 -0.2,2 -0.6,2.8 -0.4,0.8 -0.9,1.5 -1.5,2.1 -0.6,0.6 -1.4,1 -2.2,1.3 -0.8,0.3 -1.7,0.5 -2.6,0.5 -0.9,0 -1.8,-0.2 -2.6,-0.5 -0.8,-0.3 -1.6,-0.8 -2.2,-1.3 -0.6,-0.5 -1.1,-1.3 -1.5,-2.1 -0.4,-0.8 -0.6,-1.8 -0.6,-2.8 0.1,-1.1 0.3,-2 0.6,-2.8 z m 1.7,4.9 c 0.3,0.6 0.6,1.2 1.1,1.7 0.5,0.5 1,0.8 1.6,1.1 0.6,0.3 1.3,0.4 2,0.4 0.7,0 1.4,-0.1 2,-0.4 0.6,-0.3 1.2,-0.6 1.6,-1.1 0.5,-0.5 0.8,-1 1.1,-1.7 0.3,-0.6 0.4,-1.4 0.4,-2.1 0,-0.7 -0.1,-1.5 -0.4,-2.1 -0.3,-0.6 -0.6,-1.2 -1.1,-1.7 -0.5,-0.5 -1,-0.8 -1.6,-1.1 -0.6,-0.3 -1.3,-0.4 -2,-0.4 -0.7,0 -1.4,0.1 -2,0.4 -0.6,0.3 -1.2,0.6 -1.6,1.1 -0.5,0.5 -0.8,1 -1.1,1.7 -0.3,0.6 -0.4,1.3 -0.4,2.1 0,0.8 0.1,1.4 0.4,2.1 z m 4.8,-5.9 c 0.9,0 1.7,0.2 2.2,0.5 0.5,0.3 0.8,0.9 0.8,1.7 0,0.3 -0.1,0.6 -0.2,0.9 -0.1,0.2 -0.2,0.4 -0.4,0.6 -0.2,0.2 -0.4,0.3 -0.6,0.4 -0.2,0.1 -0.5,0.1 -0.8,0.2 l 2,3.3 H 450 l -1.8,-3.2 h -0.9 v 3.2 h -1.5 V 21 Z m 0,3.1 c 0.4,0 0.8,-0.1 1.1,-0.2 0.3,-0.1 0.4,-0.4 0.4,-0.9 0,-0.2 0,-0.4 -0.1,-0.5 -0.1,-0.1 -0.2,-0.2 -0.4,-0.3 -0.1,-0.1 -0.3,-0.1 -0.5,-0.1 -0.2,0 -0.4,0 -0.5,0 h -1.3 v 2 z'
									inkscape:connector-curvature='0'
									className={classes['toolpanel__logo__fill']}
								/>
							</g>
						</g>
					</svg>
				</header>
				<div className={classes['toolpanel__navigation']}>
					<Collapse accordion items={items} />
				</div>
			</aside>
		</>
	);
};
