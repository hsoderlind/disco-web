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
import { Form, Button, Dropdown, MenuProps } from 'antd';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { ProductConditions } from '../../../services/product/ProductConditions';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { ProductImageUpload } from '../components/product-image/ProductImageUpload';
import { ProductFileUpload } from '../components/product-file/ProductFileUpload';
import { Stock } from '../components/Stock';
import { Price } from '../components/Prices';
import { ProductsAttributes } from '../components/ProductAttributes';
import { Details } from '../components/Details';
import { Description } from '../components/Description';
import { ProductStates } from '../../../services/product/ProductStates';
import { DevTool } from '@hookform/devtools';
import { Sidebar } from '../components/Sidebar';

const DEFAULT_SECTION = 'description';

export function Component() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams({ section: DEFAULT_SECTION });
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
			price_incl_vat: 0,
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
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting, errors }
	} = methods;
	console.log('errors', errors);

	const mutation = useMutation<Product, ServerValidationError, ProductSchemaType>(mutationFn, {
		onSuccess(product) {
			app.addSuccessNotification({ description: 'Produkten har nu skapats.' });
			const productId = product.getKey();
			navigate(`../${productId}`, { state: { title: product.get('name') } });
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<ProductSchemaType>(error)(setError);
			app.addErrorNotification({ description: error.message });
		}
	});

	const onSubmit: SubmitHandler<ProductSchemaType> = (values) => {
		return mutation.mutateAsync(values);
	};

	const saveAndPublish = () => {
		setValue('state', ProductStates.PUBLISHED);
		handleSubmit(onSubmit)();
	};

	const saveDraft = () => {
		setValue('state', ProductStates.DRAFT);
		handleSubmit(onSubmit)();
	};

	const goToProducts = () => {
		navigate(`../?category=${category}`, { state: { title: 'Produkter' } });
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
					<Sidebar />
					<MainContentLayout
						renderButtonBar={() => (
							<ButtonBar>
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
							</ButtonBar>
						)}>
						{section === 'description' && <Description />}
						{section === 'details' && <Details />}
						{section === 'features' && <ProductsAttributes />}
						{section === 'price' && <Price />}
						{section === 'images' && <ProductImageUpload />}
						{section === 'files' && <ProductFileUpload />}
						{section === 'stock' && <Stock />}
					</MainContentLayout>
				</ContentLayout>
			</Form>
			<DevTool placement='top-left' control={methods.control} />
		</FormProvider>
	);
}
