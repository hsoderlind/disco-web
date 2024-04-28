import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RouteParams } from '../../../types/common';
import { useLoadProduct } from '../../../services/product/hooks/useLoadProduct';
import { useForm } from '../../../hooks/useForm';
import { ProductSchemaType, productSchema } from '../../../services/product/types';
import { ProductStates } from '../../../services/product/ProductStates';
import { Button, Dropdown, Form, MenuProps } from 'antd';
import { useEffect } from 'react';
import app from '../../../lib/application-builder/ApplicationBuilder';
import { useUpdateProduct } from '../../../services/product/hooks/useUpdateProduct';
import { useMutation } from '@tanstack/react-query';
import { ServerValidationError } from '../../../lib/error/types';
import { ExtractErrors } from '../../../lib/error/ExtractErrors';
import { Product } from '../../../services/product/Product';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { Sidebar } from '../components/Sidebar';
import { MainContentLayout } from '../../../components/layout/content-layout/MainContentLayout';
import { ButtonBar } from '../../../components/forms/buttonbar';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Description } from '../components/Description';
import { Details } from '../components/Details';
import { ProductsAttributes } from '../components/ProductAttributes';
import { Price } from '../components/Prices';
import { ProductImageUpload } from '../components/product-image/ProductImageUpload';
import { ProductFileUpload } from '../components/product-file/ProductFileUpload';
import { Stock } from '../components/Stock';
import { DevTool } from '@hookform/devtools';
import { loadProduct as loader } from '../../../services/product/loaders';
import { useProductImageStore } from '../components/product-image/store';
import { File } from '../../../services/file/File';

const DEFAULT_SECTION = 'description';

export { loader };

export function Component() {
	const { id } = useParams<RouteParams>();
	const { data: product } = useLoadProduct(parseInt(id!));
	const productImageStore = useProductImageStore();
	const mutationFn = useUpdateProduct(product!);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams({ section: DEFAULT_SECTION });
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const section = searchParams.get('section');
	const methods = useForm<ProductSchemaType>({
		defaultValues: typeof product !== 'undefined' ? product.toFormValues() : {},
		schema: productSchema
	});
	const {
		handleSubmit,
		setError,
		setValue,
		formState: { isDirty, isSubmitting, isValid, errors }
	} = methods;
	const isError = Object.keys(errors).length > 0;
	console.log('form errors', errors);

	const mutation = useMutation<Product, ServerValidationError, ProductSchemaType>(mutationFn, {
		onSuccess() {
			app.addSuccessNotification({ description: 'Produkten har nu sparats.' });
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<ProductSchemaType>(error)(setError);
			app.addErrorNotification({ description: error.message });
		}
	});
	const onSubmit: SubmitHandler<ProductSchemaType> = (formValues) => {
		if (productImageStore.models.length > 0) {
			formValues.images = productImageStore.models.map((model) => ({
				uploadModelRef: model.getKey(),
				sort_order: model.get('sort_order'),
				use_as_cover: false,
				meta: {
					id: model.get<File>('model').get('id'),
					extension: model.get<File>('model').get('extension'),
					filename: model.get<File>('model').get('filename'),
					mimetype: model.get<File>('model').get('mimetype'),
					size: model.get<File>('model').get('size'),
					storage_provider: model.get<File>('model').get('storage_provider')
				}
			}));
		}
		return mutation.mutateAsync(formValues);
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

	useEffect(() => {
		if (!isValid && isError) {
			app.showErrorMessage('Det förekommer fel i formuläret!');
		}
	}, [isValid, isError]);

	return (
		<FormProvider {...methods}>
			<Form layout='vertical'>
				<ContentLayout>
					<Sidebar />
					<MainContentLayout
						renderButtonBar={
							<ButtonBar>
								<Button type='default' icon={<ArrowLeftOutlined />} onClick={goToProducts} size='large'>
									Produkter
								</Button>
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
							</ButtonBar>
						}>
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
