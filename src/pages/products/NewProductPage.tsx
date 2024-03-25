import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { useCreateProduct } from '../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../services/product/types';
import { useShopStore } from '../../services/shop/store';
import { ServerValidationError } from '../../lib/error/types';
import { Product } from '../../services/product/Product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Form, Input, InputNumber, Row, Col, Menu, Segmented, Switch, DatePicker, Select, Button, Affix } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { TaxSelect } from '../../components/forms/controls/TaxSelect';
import { useEffect, useState } from 'react';
import { useGetTaxes } from '../../services/tax/hooks/useGetTaxes';
import { UncontrolledLabel } from '../../components/forms/UncontrolledLabel';
import { Editor } from '../../components/forms/controls/Editor';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { CategorySelect } from '../../components/forms/controls/CategorySelect';
import app from '../../lib/application-builder/ApplicationBuilder';
import { SidebarContentLayout } from '../../components/layout/content-layout/SidebarContentLayout';
import { ProductConditions } from '../../services/product/ProductConditions';
import {
	ArrowLeftOutlined,
	CheckOutlined,
	CloseOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined
} from '@ant-design/icons';
import { Str } from '../../lib/string/Str';

const DEFAULT_SECTION = 'details';

export function Component() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams({ section: DEFAULT_SECTION });
	const section = searchParams.get('section');
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const [priceInclVat, setPriceInclVat] = useState(0);
	const shopId = useShopStore((state) => state.shop.id);
	const [taxesQueryKey, taxesQueryFn] = useGetTaxes(shopId);
	const { data: taxes } = useQuery(taxesQueryKey, taxesQueryFn);
	const [mutationFn] = useCreateProduct(shopId);
	const { control, handleSubmit, setError, watch } = useForm<ProductSchemaType>({
		defaultValues: {
			reference: '',
			supplier_reference: '',
			name: '',
			summary: '',
			description: '',
			price: 0,
			cost_price: 0,
			categories: category > 0 ? [category] : [],
			available_for_order: true,
			barcodes: [
				{
					id: Str.uuid()
				}
			]
		},
		schema: productSchema
	});
	const {
		fields: barcodeFields,
		insert: insertBarcode,
		remove: removeBarcode
	} = useFieldArray({
		control,
		name: 'barcodes'
	});

	const mutation = useMutation<Product, ServerValidationError, ProductSchemaType>(mutationFn, {
		onSuccess(product) {
			app.addSuccessNoitication({ description: 'Produkten har nu skapats.' });
			const productId = product.getKey();
			navigate(`./${productId}`);
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<ProductSchemaType>(error)(setError);
			app.addErrorNoitication({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<ProductSchemaType> = (values) => {
		mutation.mutate(values);
	};

	const goToProducts = () => {
		navigate(`../?category=${category}`);
	};

	const price = watch('price');
	const taxId = watch('tax_id');

	useEffect(() => {
		const tax = taxId && taxes?.find(taxId);

		if (tax && typeof price !== 'undefined') {
			const taxValue = tax.get<number>('value')! / 100 + 1.0;
			const priceInclVat = price * taxValue;
			setPriceInclVat(priceInclVat);
		}
	}, [watch, taxes, price, taxId]);

	return (
		<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<ContentLayout>
				<MainContentLayout>
					{/* SECTION: DESCRIPTION */}
					{section === 'description' && (
						<>
							<Row gutter={[12, 0]}>
								<Col xl={12}>
									<FormItem control={control} name='name' label='Benämning'>
										<Input autoFocus />
									</FormItem>
								</Col>
								<Col xl={12}>
									<FormItem control={control} name='categories' label='Kategori(er)'>
										<CategorySelect treeCheckable />
									</FormItem>
								</Col>
							</Row>
							<Row gutter={[12, 0]}>
								<Col xl={4}>
									<FormItem control={control} name='price' label='Nettopris'>
										<InputNumber precision={2} addonAfter='kr' />
									</FormItem>
								</Col>
								<Col xl={4}>
									<FormItem control={control} name='tax_id' label='Moms'>
										<TaxSelect creatable />
									</FormItem>
								</Col>
								<Col xl={4}>
									<UncontrolledLabel label='Bruttopris' htmlFor='price_inc_vat'>
										<InputNumber precision={2} addonAfter={'kr'} value={priceInclVat} readOnly />
									</UncontrolledLabel>
								</Col>
							</Row>
							<FormItem control={control} name='summary' label='Kort beskrivning'>
								<Input.TextArea rows={6} />
							</FormItem>
							<Controller
								control={control}
								name='description'
								render={({ field }) => (
									<UncontrolledLabel htmlFor='description' label='Beskrivning'>
										<Editor onChange={field.onChange} value={field.value} />
									</UncontrolledLabel>
								)}
							/>
						</>
					)}
					{/* SECTION: DETAILS */}
					{section === 'details' && (
						<>
							<FormItem control={control} name='condition' label='Skick'>
								<Segmented<string>
									options={[
										{
											label: 'Ny',
											value: ProductConditions.NEW
										},
										{
											label: 'Begagnad',
											value: ProductConditions.USED
										},
										{
											label: 'Renoverad',
											value: ProductConditions.REFURBISHED
										}
									]}
								/>
							</FormItem>
							<FormItem control={control} name='reference' label='Referens'>
								<Input />
							</FormItem>
							<Row gutter={[12, 0]}>
								<Col xl={5}>
									<FormItem
										control={control}
										name='available_for_order'
										label='Tillgänglig att beställa'
										valuePropName='checked'>
										<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
									</FormItem>
								</Col>
								<Col xl={5}>
									<FormItem control={control} name='available_at' label='Tillgänglig från'>
										<DatePicker />
									</FormItem>
								</Col>
							</Row>
							{barcodeFields.map((barcode, index) => (
								<Row gutter={[12, 0]} key={barcode.id}>
									<Col xl={5}>
										<FormItem
											control={control}
											name={`barcodes.${index}.barcode_type`}
											label={index === 0 ? 'Streckkodstyp' : ''}>
											<Select placeholder='Välj streckkodstyp' />
										</FormItem>
									</Col>
									<Col xl={5}>
										<FormItem control={control} name={`barcodes.${index}.value`} label={index === 0 ? 'Streckkod' : ''}>
											<Input />
										</FormItem>
									</Col>
									<Col flex='auto'>
										<Button
											type='link'
											icon={<PlusCircleOutlined />}
											onClick={() => {
												insertBarcode(index + 1, {
													id: Str.uuid(),
													value: '',
													barcode_type: null!
												});
											}}
											style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
										/>
										<Button
											type='link'
											icon={<MinusCircleOutlined />}
											disabled={index === 0}
											onClick={() => removeBarcode(index)}
											style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
											danger
										/>
									</Col>
								</Row>
							))}
						</>
					)}
				</MainContentLayout>
				<SidebarContentLayout>
					<Menu
						mode='inline'
						onClick={(e) => {
							searchParams.set('section', e.key);
							setSearchParams(searchParams);
						}}
						defaultSelectedKeys={[section!]}
						items={[
							{
								label: 'Beskrivning',
								key: 'description'
							},
							{
								label: 'Märkning',
								key: 'details'
							},
							{
								label: 'Features',
								key: 'features'
							},
							{
								label: 'Pris',
								key: 'price'
							},
							{
								label: 'Lager',
								key: 'stock'
							},
							{
								label: 'Frakt',
								key: 'shipping'
							},
							{
								label: 'Korsförsäljning',
								key: 'xsell'
							}
						]}
					/>
				</SidebarContentLayout>
			</ContentLayout>
			<Affix offsetBottom={0} style={{ marginTop: '5vh' }}>
				<div className='buttonbar'>
					<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToProducts}>
						Produkter
					</Button>
					<Button type='primary'>Spara & publicera</Button>
				</div>
			</Affix>
		</Form>
	);
}
