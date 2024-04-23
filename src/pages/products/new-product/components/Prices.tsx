import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../services/product/types';
import { Button, DatePicker, Divider, InputNumber, Row, Col, Typography, DescriptionsProps, Descriptions } from 'antd';
import { GrossPriceOutput } from '../../../../components/forms/controls/GrossPriceOutput';
import FormItem from '../../../../lib/form/FormItem';
import { TaxSelect } from '../../../../components/forms/controls/TaxSelect';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Currency } from '../../../../lib/number/Currency';
import { Accounting } from '../../../../lib/accounting';
import { Num } from '../../../../lib/number/Num';

export const Price: FC = () => {
	const { control, watch } = useFormContext<ProductSchemaType>();
	const { fields, append, remove } = useFieldArray({ control, name: 'special_prices', keyName: 'key' });

	const priceValue = watch('price');
	const costPriceValue = watch('cost_price');
	const grossPriceValue = watch('price_incl_vat');

	const summary: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Marginal',
			children: Currency.format(Accounting.countMargin(priceValue, costPriceValue))
		},
		{
			key: '2',
			label: 'Marginalgrad',
			children: Num.percent(Accounting.countMarginRate(priceValue, costPriceValue))
		},
		{
			key: '3',
			label: 'Inköpspris',
			children: Currency.format(costPriceValue)
		},
		{
			key: '4',
			label: 'Försäljningspris exkl. moms',
			children: Currency.format(priceValue)
		},
		{
			key: '5',
			label: 'Försäljningspris inkl. moms',
			children: Currency.format(grossPriceValue ?? 0)
		}
	];

	const [parent] = useAutoAnimate();

	const newSpecialPrice = () =>
		append({
			special_price: 0,
			entry_date: dayjs(),
			expiration_date: null!
		});

	return (
		<Row gutter={[12, 0]}>
			<Col xl={16}>
				<Typography.Title level={2}>Inköpspris</Typography.Title>
				<Row gutter={[12, 0]}>
					<Col xl={6}>
						<FormItem control={control} name='cost_price' label='Nettopris'>
							<InputNumber precision={2} addonAfter='kr' decimalSeparator=',' />
						</FormItem>
					</Col>
				</Row>
				<Divider />
				<Typography.Title level={2}>Ordinarie pris</Typography.Title>
				<Row gutter={[12, 0]}>
					<Col xl={6}>
						<FormItem control={control} name='price' label='Nettopris'>
							<InputNumber precision={2} addonAfter='kr' decimalSeparator=',' />
						</FormItem>
					</Col>
					<Col xl={6}>
						<FormItem control={control} name='tax_id' label='Moms'>
							<TaxSelect creatable />
						</FormItem>
					</Col>
					<Col xl={6}>
						<GrossPriceOutput
							name='price_incl_vat'
							label='Bruttopris'
							netPriceFieldName='price'
							taxIdFieldName='tax_id'
							precision={2}
							addonAfter={'kr'}
						/>
					</Col>
				</Row>
				<Divider />
				<Typography.Title level={2}>Kampanjer</Typography.Title>
				<div ref={parent}>
					{fields.map((specialPrice, index) => (
						<Row gutter={[12, 0]} key={specialPrice.key}>
							<Col xl={5}>
								<FormItem
									control={control}
									name={`special_prices.${index}.special_price`}
									label={index === 0 ? 'Nettopris' : ''}>
									<InputNumber min={0} precision={2} addonAfter='kr' decimalSeparator=',' />
								</FormItem>
							</Col>
							<Col xl={5}>
								<GrossPriceOutput
									name={`special_prices.${index}.price_incl_vat`}
									label={index === 0 ? 'Bruttopris' : ''}
									netPriceFieldName={`special_prices.${index}.special_price`}
									taxIdFieldName='tax_id'
									precision={2}
									addonAfter={'kr'}
								/>
							</Col>
							<Col xl={5}>
								<FormItem
									control={control}
									name={`special_prices.${index}.entry_date`}
									label={index === 0 ? 'Giltig från' : ''}>
									<DatePicker />
								</FormItem>
							</Col>
							<Col xl={5}>
								<FormItem
									control={control}
									name={`special_prices.${index}.expiration_date`}
									label={index === 0 ? 'Giltig till' : ''}>
									<DatePicker />
								</FormItem>
							</Col>
							<Col xl={2}>
								<Button
									type='link'
									icon={<DeleteOutlined />}
									onClick={() => remove(index)}
									style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
									danger
								/>
							</Col>
						</Row>
					))}
				</div>
				<Button icon={<PlusOutlined />} onClick={newSpecialPrice}>
					Lägg till rea-pris
				</Button>
			</Col>
			<Col xl={8}>
				<Descriptions title='Summering' items={summary} layout='vertical' column={1} />
			</Col>
		</Row>
	);
};
