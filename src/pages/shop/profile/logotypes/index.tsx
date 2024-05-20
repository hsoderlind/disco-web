import { Alert, Typography } from 'antd';
import { MainContentLayout } from '../../../../components/layout/content-layout/MainContentLayout';
import { Logotype } from './logotype';

export const Logotypes = () => {
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
				multiple={false}
				accept={{ 'image/*': [] }}
				onUploaded={(file) => console.log('file', file)}
			/>

			<Logotype
				title='Faktura'
				inputName='logotype'
				className='my-5'
				multiple={false}
				accept={{ 'image/*': [] }}
				onUploaded={(file) => console.log('file', file)}
			/>

			<Logotype
				title='Mini'
				inputName='logotype'
				className='my-5'
				multiple={false}
				accept={{ 'image/*': [] }}
				onUploaded={(file) => console.log('file', file)}
			/>
		</MainContentLayout>
	);
};
