import { Alert, Skeleton, Typography } from 'antd';
import { MainContentLayout } from '../../../../components/layout/content-layout/MainContentLayout';
import { Logotype } from './logotype';
import { useShopStore } from '../../../../services/shop/store';
import { useSetLogotype as useSetShopLogotype } from '../../../../services/shop/hooks/useSetLogotype';
import { Upload } from '../../../../components/forms/controls/upload/types';
import { File } from '../../../../services/file/File';
import { LogotypeSchema } from '../../../../services/logotype/types';
import { Str } from '../../../../lib/string/Str';
import { useSetLogotype as useSetInvoiceLogotype } from '../../../../services/invoice-settings/hooks/useSetLogotype';
import { useGetInvoiceSettings } from '../../../../services/invoice-settings/hooks/useGetInvoiceSettings';
import { Obj } from '../../../../lib/object/Obj';

export const Logotypes = () => {
	const { data: invoiceSettings, isFetching, isLoading } = useGetInvoiceSettings();
	const shop = useShopStore((state) => state.shop);
	const update = useShopStore((state) => state.update);
	const shopLogotypeMutation = useSetShopLogotype(shop.id, {
		onSuccess: (shop) => {
			update(shop.toJSON());
		}
	});
	const invoiceLogotypeMutation = useSetInvoiceLogotype();

	const saveShopLogotype = (file: Upload, context: 'default' | 'mini') => {
		const logotype: LogotypeSchema = { meta: file.get<File>('model').toJSON() };

		shopLogotypeMutation.mutate({ logotype, context });
	};

	const saveInvoiceLogotype = (file: Upload) => {
		const logotype: LogotypeSchema = { meta: file.get<File>('model').toJSON() };

		invoiceLogotypeMutation.mutate(logotype);
	};

	const defaultLogotype = Obj.isNotEmpty(shop.default_logotype)
		? [
				new Upload(
					{
						key: Str.uuid(),
						isUploaded: true,
						storageProvider: 'logotype',
						uploadProgress: 100,
						model: new File(shop.default_logotype.meta, shop.id)
					},
					shop.id
				)
		  ]
		: undefined;

	const miniLogotype = Obj.isNotEmpty(shop.mini_logotype)
		? [
				new Upload(
					{
						key: Str.uuid(),
						isUploaded: true,
						storageProvider: 'logotype',
						uploadProgress: 100,
						model: new File(shop.mini_logotype.meta, shop.id)
					},
					shop.id
				)
		  ]
		: undefined;

	const invoiceLogotype =
		typeof invoiceSettings !== 'undefined' && typeof invoiceSettings.logotype()
			? [
					new Upload(
						{
							key: Str.uuid(),
							isUploaded: true,
							storageProvider: 'logotype',
							uploadProgress: 100,
							model: invoiceSettings.logotype().meta()
						},
						shop.id
					)
			  ]
			: undefined;

	return (
		<MainContentLayout>
			<Alert
				type='info'
				message='Information'
				description={
					<>
						<Typography.Paragraph>Du kan ladda upp tre typer av logotyper.</Typography.Paragraph>
						<ul>
							<li>
								<Typography.Text>
									<b>Förvald:</b> denna logotyp används som förvald logotyp och används om ingen annan variant är
									tillgänglig.
								</Typography.Text>
							</li>
							<li>
								<Typography.Text>
									<b>Faktura:</b> denna logotyp används på fakturor och kvitton.
								</Typography.Text>
							</li>
							<li>
								<Typography.Text>
									<b>Mini:</b> denna logotyp används i t.ex. menyer.
								</Typography.Text>
							</li>
						</ul>
					</>
				}
			/>
			<Logotype
				title='Förvald'
				inputName='logotype'
				className='my-5'
				defaultValue={defaultLogotype}
				multiple={false}
				accept={{ 'image/*': [] }}
				onUploaded={(file) => saveShopLogotype(file, 'default')}
			/>

			<Logotype
				title='Mini'
				inputName='logotype'
				className='my-5'
				multiple={false}
				defaultValue={miniLogotype}
				accept={{ 'image/*': [] }}
				onUploaded={(file) => saveShopLogotype(file, 'mini')}
			/>

			{!isFetching && !isLoading ? (
				<Logotype
					title='Faktura'
					inputName='logotype'
					className='my-5'
					defaultValue={
						typeof invoiceLogotype !== 'undefined' && invoiceLogotype[0].get<File>('model').getKey() > 0
							? invoiceLogotype
							: undefined
					}
					multiple={false}
					accept={{ 'image/*': [] }}
					onUploaded={saveInvoiceLogotype}
				/>
			) : (
				<Skeleton.Input />
			)}
		</MainContentLayout>
	);
};
