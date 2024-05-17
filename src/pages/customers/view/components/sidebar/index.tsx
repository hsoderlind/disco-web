import { Menu, Tooltip } from 'antd';
import { SidebarContentLayout } from '../../../../../components/layout/content-layout/SidebarContentLayout';
import { useSearchParams } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personOutline, ticketOutline, walletOutline } from 'ionicons/icons';
import {
	BankOutlined,
	CalendarOutlined,
	CodeOutlined,
	CreditCardOutlined,
	FileOutlined,
	FormOutlined,
	HomeOutlined,
	UnorderedListOutlined
} from '@ant-design/icons';

export const Sidebar = () => {
	const [searchParams, setSearchParams] = useSearchParams({ section: 'details' });
	const section = searchParams.get('section');

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
							key: 'details',
							label: 'Uppgifter',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Uppgifter' : undefined}>
									<IonIcon
										size='small'
										md={personOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Uppgifter' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'payments',
							label: 'Betalningar',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Betalningar' : undefined}>
									<BankOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Betalningar' })} />
								</Tooltip>
							)
						},
						{
							key: 'payment-methods',
							label: 'Betalmetoder',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Betalmetoder' : undefined}>
									<CreditCardOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Betalmetoder' })} />
								</Tooltip>
							)
						},
						{
							key: 'invoices',
							label: 'Fakturor',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Fakturor' : undefined}>
									<FileOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Fakturor' })} />
								</Tooltip>
							)
						},
						{
							key: 'orders',
							label: 'Beställningar',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Beställningar' : undefined}>
									<UnorderedListOutlined
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Beställningar' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'addresses',
							label: 'Adresser',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Adresser' : undefined}>
									<HomeOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Adresser' })} />
								</Tooltip>
							)
						},
						{
							key: 'discounts',
							label: 'Rabatter & kuponger',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Rabatter & kuponger' : undefined}>
									<IonIcon
										size='small'
										md={ticketOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Rabatter & kuponger' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'credit-balance',
							label: 'Kreditsaldo',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Kreditsaldo' : undefined}>
									<IonIcon
										size='small'
										md={walletOutline}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Kreditsaldo' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'notes',
							label: 'Anteckningar',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Anteckningar' : undefined}>
									<FormOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Anteckningar' })} />
								</Tooltip>
							)
						},
						{
							key: 'metadata',
							label: 'Metadata',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Metadata' : undefined}>
									<CodeOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Metadata' })} />
								</Tooltip>
							)
						},
						{
							key: 'events',
							label: 'Händelser',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Händelser' : undefined}>
									<CalendarOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Händelser' })} />
								</Tooltip>
							)
						}
					]}
				/>
			)}
		</SidebarContentLayout>
	);
};
