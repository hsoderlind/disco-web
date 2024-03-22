import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { useCreateProduct } from '../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../services/product/types';
import { useShopStore } from '../../services/shop/store';
import { ServerValidationError } from '../../lib/error/types';
import { Product } from '../../services/product/Product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Row, Col } from 'antd';
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

export function Component() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
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
			name: 'Bruce Springsteen - Darkness on the edge of town',
			description: '',
			price: 0,
			categories: category > 0 ? [category] : []
		},
		schema: productSchema
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
		<ContentLayout>
			<MainContentLayout>
				<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
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
						<Col xl={3}>
							<FormItem control={control} name='price' label='Nettopris'>
								<InputNumber precision={2} addonAfter='kr' />
							</FormItem>
						</Col>
						<Col xl={4}>
							<FormItem control={control} name='tax_id' label='Moms'>
								<TaxSelect creatable />
							</FormItem>
						</Col>
						<Col xl={3}>
							<UncontrolledLabel label='Bruttopris' htmlFor='price_inc_vat'>
								<InputNumber precision={2} addonAfter={'kr'} value={priceInclVat} readOnly />
							</UncontrolledLabel>
						</Col>
					</Row>
					<Controller
						control={control}
						name='description'
						render={({ field }) => (
							<UncontrolledLabel htmlFor='description' label='Beskrivning'>
								<Editor onChange={field.onChange} value={field.value} />
							</UncontrolledLabel>
						)}
					/>
				</Form>
			</MainContentLayout>
		</ContentLayout>
	);
}
