import { useMutation } from '@tanstack/react-query';
import { useForm } from '../../../hooks/useForm';
import { useCreateProduct } from '../../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../../services/product/types';
import { useShopStore } from '../../../services/shop/store';
import { ServerValidationError } from '../../../lib/error/types';
import { Product } from '../../../services/product/Product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { Form, Menu, Button, Dropdown, Badge, MenuProps, Tooltip } from 'antd';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { ProductConditions } from '../../../services/product/ProductConditions';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FloatingButtonBar } from '../../../components/forms/FloatingButtonbar';
import { ProductImageUpload } from './components/product-image/ProductImageUpload';
import { DevTool } from '@hookform/devtools';
import { ProductFileUpload } from './components/product-file/ProductFileUpload';
import { Stock } from './components/Stock';
import { Price } from './components/Prices';
import { ProductsAttributes } from './components/ProductAttributes';
import { Details } from './components/Details';
import { Description } from './components/Description';
import { ProductStates } from '../../../services/product/ProductStates';
import {
	barcodeOutline,
	createOutline,
	cubeOutline,
	documentsOutline,
	imagesOutline,
	optionsOutline,
	pricetagsOutline
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const DEFAULT_SECTION = 'details';

export function Component() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams({ section: DEFAULT_SECTION });
	const section = searchParams.get('section');
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const shopId = useShopStore((state) => state.shop.id);
	const [mutationFn] = useCreateProduct(shopId);
	const methods = useForm<ProductSchemaType>({
		defaultValues: {
			state: ProductStates.PUBLISHED,
			reference: '',
			supplier_reference: '',
			name: '',
			summary: '',
			description: '',
			price: 0,
			cost_price: 0,
			categories: category > 0 ? [category] : [],
			condition: ProductConditions.NEW,
			barcodes: [],
			product_attributes: [],
			special_prices: [],
			stock: {
				min_order_quantity: 1,
				out_of_stock_message: 'Slutsåld',
				in_stock_message: 'I lager',
				allow_order_out_of_stock: false,
				send_email_out_of_stock: false
			}
		},
		schema: productSchema
	});
	const {
		control,
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting }
	} = methods;

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
		return mutation.mutateAsync(values);
	};

	const saveAndPublish = () => {
		setValue('state', ProductStates.PUBLISHED);
		handleSubmit(onSubmit, (...args) => console.log('args', args))();
	};

	const saveDraft = () => {
		setValue('state', ProductStates.DRAFT);
		handleSubmit(onSubmit, (...args) => console.log('args', args))();
	};

	const goToProducts = () => {
		navigate(`../?category=${category}`);
	};

	const onMenuClick: MenuProps['onClick'] = (event) => {
		switch (event.key) {
			case 'save draft':
				saveDraft();
				break;
			case 'delete':
			// TODO: delete product
		}
	};

	return (
		<FormProvider {...methods}>
			<Form layout='vertical'>
				<ContentLayout>
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
										key: 'shipping',
										disabled: true
									},
									{
										label: (
											<Badge.Ribbon text='Kommer snart' color='lime' style={{ marginInlineEnd: '10px' }}>
												Korsförsäljning
											</Badge.Ribbon>
										),
										key: 'xsell',
										disabled: true
									},
									{
										label: (
											<Badge.Ribbon text='Kommer snart' color='lime' style={{ marginInlineEnd: '10px' }}>
												Uppförsäljning
											</Badge.Ribbon>
										),
										key: 'upsell',
										disabled: true
									}
								]}
								style={{ border: 'none' }}
							/>
						)}
					</SidebarContentLayout>
					<MainContentLayout>
						{section === 'description' && <Description />}
						{section === 'details' && <Details />}
						{section === 'features' && <ProductsAttributes />}
						{section === 'price' && <Price />}
						{section === 'images' && <ProductImageUpload />}
						{section === 'files' && <ProductFileUpload />}
						{section === 'stock' && <Stock />}
						<DevTool control={control} />
					</MainContentLayout>
				</ContentLayout>
				<FloatingButtonBar>
					<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToProducts} size='large'>
						Produkter
					</Button>
					<div>
						<Dropdown.Button
							type='primary'
							size='large'
							onClick={saveAndPublish}
							disabled={!isDirty}
							loading={isSubmitting}
							menu={{
								items: [
									{
										key: 'save draft',
										label: 'Spara som utkast',
										disabled: !isDirty || isSubmitting
									},
									{
										key: 'delete',
										label: 'Radera produkten',
										danger: true,
										disabled: isSubmitting
									}
								],
								onClick: onMenuClick
							}}>
							Spara & publicera
						</Dropdown.Button>
					</div>
				</FloatingButtonBar>
			</Form>
		</FormProvider>
	);
}
