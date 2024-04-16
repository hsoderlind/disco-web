import { useMutation } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { useCreateProduct } from '../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../services/product/types';
import { useShopStore } from '../../services/shop/store';
import { ServerValidationError } from '../../lib/error/types';
import { Product } from '../../services/product/Product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import {
	Form,
	Input,
	InputNumber,
	Row,
	Col,
	Menu,
	Segmented,
	Switch,
	DatePicker,
	Select,
	Button,
	Dropdown,
	Divider,
	Space,
	Typography
} from 'antd';
import FormItem from '../../lib/form/FormItem';
import { TaxSelect } from '../../components/forms/controls/TaxSelect';
import { UncontrolledLabel } from '../../components/forms/UncontrolledLabel';
import { Editor } from '../../components/forms/controls/Editor';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { CategorySelect } from '../../components/forms/controls/CategorySelect';
import app from '../../lib/application-builder/ApplicationBuilder';
import { SidebarContentLayout } from '../../components/layout/content-layout/SidebarContentLayout';
import { ProductConditions } from '../../services/product/ProductConditions';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Str } from '../../lib/string/Str';
import { useLoadBarcodeTypes } from '../../services/barcode-type/hooks/useLoadBarcodeTypes';
import { CreateBarcodeTypeButton } from '../../components/forms/controls/CreateBarcodeTypeButton';
import { useLoadAllAttributeTypes } from '../../services/product-attribute/hooks/useLoadAllAttributeTypes';
import { ExpandableControl } from '../../components/forms/controls/ExpandableControl';
import { CreateAttributeTypeButton } from '../../components/forms/controls/CreateAttributeTypeButton';
import { AttributeValueSelect } from '../../components/forms/controls/AttributeValueSelect';
import dayjs from 'dayjs';
import { FormItemWithControl } from '../../components/forms/FormItemWithControl';
import { GrossPriceOutput } from '../../components/forms/controls/GrossPriceOutput';
import { FloatingButtonBar } from '../../components/forms/FloatingButtonbar';
import { ProductImageUpload } from '../../components/forms/controls/product-image/ProductImageUpload';
import { DevTool } from '@hookform/devtools';
import { ProductImageList } from '../../components/forms/controls/product-image/ProductImageList';

const DEFAULT_SECTION = 'details';

export function Component() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams({ section: DEFAULT_SECTION });
	const section = searchParams.get('section');
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const shopId = useShopStore((state) => state.shop.id);
	const barcodeTypeQuery = useLoadBarcodeTypes();
	const attributeTypeQuery = useLoadAllAttributeTypes();
	const [mutationFn] = useCreateProduct(shopId);
	const { control, handleSubmit, setError } = useForm<ProductSchemaType>({
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
			condition: ProductConditions.NEW,
			barcodes: [],
			product_attributes: [],
			special_prices: []
		},
		schema: productSchema
	});
	const {
		fields: barcodeFields,
		append: appendBarcode,
		remove: removeBarcode
	} = useFieldArray({
		control,
		name: 'barcodes',
		keyName: 'key'
	});
	const {
		fields: productAttributeFields,
		append: appendProductAttribute,
		remove: removeProductAttribute
	} = useFieldArray({ control, name: 'product_attributes', keyName: 'key' });
	const {
		fields: specialPriceFields,
		append: appendSpecialPrice,
		remove: removeSpecialPrice
	} = useFieldArray({ control, name: 'special_prices', keyName: 'key' });

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

	const newProductAttribute = () =>
		appendProductAttribute({
			key: Str.uuid(),
			active: true,
			attribute_type_id: null!,
			attribute_value_id: null!,
			sort_order: 0,
			stock: {
				allow_order_out_of_stock: false,
				initial_quantity: 0,
				available_at: dayjs(),
				out_of_stock_message: 'Slutsåld',
				reserved_quantity: 0,
				sku: '',
				sold_quantity: 0,
				stock_unit: ''
			}
		});

	const newSpecialPrice = () =>
		appendSpecialPrice({
			key: Str.uuid(),
			special_price: 0,
			entry_date: dayjs(),
			expiration_date: null!
		});

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
							<Typography.Title level={2}>Märkning</Typography.Title>
							<FormItem control={control} name='condition' label='Produktens skick'>
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
							<Divider />
							<Typography.Title level={2}>Produktkoder</Typography.Title>
							{barcodeFields.map((barcode, index) => (
								<Row gutter={[12, 0]} key={barcode.key}>
									<Col xl={5}>
										<FormItem
											control={control}
											name={`barcodes.${index}.barcode_type`}
											label={index === 0 ? 'Produktkodstyp' : ''}>
											<Select
												placeholder='Välj streckkodstyp'
												options={barcodeTypeQuery.data?.map((barcodeType) => ({
													value: barcodeType.getKey(),
													label: barcodeType.get<string>('label')
												}))}
												dropdownRender={(menu) => (
													<>
														{menu}
														<Divider style={{ margin: '8px 0' }} />
														<Space style={{ margin: '0 8px 4px' }}>
															<CreateBarcodeTypeButton />
														</Space>
													</>
												)}
											/>
										</FormItem>
									</Col>
									<Col xl={5}>
										<FormItem
											control={control}
											name={`barcodes.${index}.value`}
											label={index === 0 ? 'Produktkod' : ''}>
											<Input />
										</FormItem>
									</Col>
									<Col flex='auto'>
										<Button
											type='link'
											icon={<DeleteOutlined />}
											onClick={() => removeBarcode(index)}
											style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
											danger
										/>
									</Col>
								</Row>
							))}
							<Button
								icon={<PlusOutlined />}
								onClick={() => {
									appendBarcode({
										key: Str.uuid(),
										value: '',
										barcode_type: null!
									});
								}}>
								Lägg till produktkod
							</Button>
						</>
					)}
					{section === 'features' && (
						<>
							<Typography.Title level={2}>Features</Typography.Title>
							{productAttributeFields.map((productAttribute, index) => (
								<ExpandableControl
									key={productAttribute.key}
									renderVisibleContent={(toggle) => (
										<Row gutter={[12, 0]}>
											<Col xl={5}>
												<FormItem
													control={control}
													name={`product_attributes.${index}.attribute_type_id`}
													label={index === 0 ? 'Attributtyp' : ''}>
													<Select
														placeholder='Välj attributtyp'
														options={attributeTypeQuery.data?.map((attributeType) => ({
															value: attributeType.getKey(),
															label: attributeType.get<string>('label')
														}))}
														dropdownRender={(menu) => (
															<>
																{menu}
																<Divider style={{ margin: '8px 0' }} />
																<Space style={{ margin: '0 8px 4px' }}>
																	<CreateAttributeTypeButton />
																</Space>
															</>
														)}
													/>
												</FormItem>
											</Col>
											<Col xl={5}>
												<FormItemWithControl
													control={control}
													name={`product_attributes.${index}.attribute_value_id`}
													label={index === 0 ? 'Attributvärde' : ''}>
													<AttributeValueSelect
														control={control}
														connectedFieldName={`product_attributes.${index}.attribute_type_id`}
													/>
												</FormItemWithControl>
											</Col>
											<Col flex='100px'>
												<Button
													type='link'
													onClick={toggle}
													style={{ marginBlockStart: index === 0 ? '32px' : undefined }}>
													Skapa lager
												</Button>
											</Col>
											<Col flex='auto'>
												<Button
													type='link'
													icon={<DeleteOutlined />}
													onClick={() => removeProductAttribute(index)}
													style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
													danger
												/>
											</Col>
										</Row>
									)}
									renderExpandableContent={
										<>
											<FormItem control={control} name={`product_attributes.${index}.stock.sku`} label='SKU'>
												<Input />
											</FormItem>
											<FormItem
												control={control}
												name={`product_attributes.${index}.stock.initial_quantity`}
												label='Lagersaldo'>
												<InputNumber />
											</FormItem>
											<Row gutter={[12, 0]}>
												<Col xl={5}>
													<FormItem
														control={control}
														name={`product_attributes.${index}.stock.available_at`}
														label='Tillgänglig från'>
														<DatePicker />
													</FormItem>
												</Col>
												<Col flex='auto'>
													<FormItem
														control={control}
														name={`product_attributes.${index}.stock.allow_order_out_of_stock`}
														label='Tillåt beställning vid slutsåld'
														valuePropName='checked'>
														<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
													</FormItem>
												</Col>
											</Row>
											<FormItem
												control={control}
												name={`product_attributes.${index}.stock.out_of_stock_message`}
												label='Meddelande vid slutsåld'>
												<Input />
											</FormItem>
										</>
									}
								/>
							))}
							<Button icon={<PlusOutlined />} onClick={newProductAttribute}>
								Lägg till feature
							</Button>
						</>
					)}
					{section === 'price' && (
						<>
							<Typography.Title level={2}>Ordinarie pris</Typography.Title>
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
									<GrossPriceOutput
										control={control}
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
							{specialPriceFields.map((specialPrice, index) => (
								<Row gutter={[12, 0]} key={specialPrice.key}>
									<Col xl={4}>
										<FormItem
											control={control}
											name={`special_prices.${index}.special_price`}
											label={index === 0 ? 'Nettopris' : ''}>
											<InputNumber min={0} precision={2} addonAfter='kr' />
										</FormItem>
									</Col>
									<Col xl={4}>
										<GrossPriceOutput
											control={control}
											name={`special_prices.${index}.price_incl_vat`}
											label={index === 0 ? 'Bruttopris' : ''}
											netPriceFieldName={`special_prices.${index}.special_price`}
											taxIdFieldName='tax_id'
											precision={2}
											addonAfter={'kr'}
										/>
									</Col>
									<Col xl={4}>
										<FormItem
											control={control}
											name={`special_prices.${index}.entry_date`}
											label={index === 0 ? 'Giltig från' : ''}>
											<DatePicker />
										</FormItem>
									</Col>
									<Col xl={4}>
										<FormItem
											control={control}
											name={`special_prices.${index}.expiration_date`}
											label={index === 0 ? 'Giltig till' : ''}>
											<DatePicker />
										</FormItem>
									</Col>
									<Col flex='auto'>
										<Button
											type='link'
											icon={<DeleteOutlined />}
											onClick={() => removeSpecialPrice(index)}
											style={{ marginBlockStart: index === 0 ? '32px' : undefined }}
											danger
										/>
									</Col>
								</Row>
							))}
							<Button icon={<PlusOutlined />} onClick={newSpecialPrice}>
								Lägg till rea-pris
							</Button>
						</>
					)}
					{section === 'files' && (
						<>
							<Typography.Title level={2}>Produktbilder</Typography.Title>
							<ProductImageUpload control={control} />
							<ProductImageList control={control} />
							<Divider style={{ marginBlock: '4px 24px' }} />
							<Typography.Title level={2}>Filer</Typography.Title>
						</>
					)}
					<DevTool control={control} />
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
								label: 'Filer & bilder',
								key: 'files'
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
							},
							{
								label: 'Uppförsäljning',
								key: 'upsell'
							},
							{
								label: 'Paketerbjudande',
								key: 'bundled-products'
							}
						]}
					/>
				</SidebarContentLayout>
			</ContentLayout>
			<FloatingButtonBar>
				<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToProducts} size='large'>
					Produkter
				</Button>
				<div>
					<Dropdown.Button
						htmlType='submit'
						type='primary'
						size='large'
						menu={{
							items: [
								{
									key: 'save draft',
									label: 'Spara som utkast'
								},
								{
									key: 'delete',
									label: 'Radera produkten',
									danger: true
								}
							]
						}}>
						Spara & publicera
					</Dropdown.Button>
				</div>
			</FloatingButtonBar>
		</Form>
	);
}
