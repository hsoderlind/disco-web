import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { useCreateProduct } from '../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../services/product/types';
import { useShopStore } from '../../services/shop/store';
import { ServerValidationError } from '../../lib/error/types';
import { Product } from '../../services/product/Product';
import { useNavigate } from 'react-router-dom';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber, Row, Col } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { TaxSelect } from '../../components/forms/controls/TaxSelect';
import { useEffect, useState } from 'react';
import { useGetTaxes } from '../../services/tax/hooks/useGetTaxes';
import { UncontrolledLabel } from '../../components/forms/UncontrolledLabel';

export const NewProductPage = () => {
	const navigate = useNavigate();
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
			description: '',
			price: 0
		},
		schema: productSchema
	});

	const mutation = useMutation<Product, ServerValidationError, ProductSchemaType>(mutationFn, {
		onSuccess(product) {
			// TODO: notification as feedback
			const productId = product.getKey();
			navigate(`./${productId}`);
		},
		onError(error) {
			ExtractErrors.fromServerValidationErrorToFormErrors<ProductSchemaType>(error)(setError);
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
			console.log('priceInclVat', priceInclVat);
			setPriceInclVat(priceInclVat);
		}
	}, [watch, taxes, price, taxId]);

	return (
		<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<FormItem control={control} name='name' label='Benämning'>
				<Input />
			</FormItem>
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
						<InputNumber id='price_inc_vat' precision={2} addonAfter={'kr'} value={priceInclVat} readOnly />
					</UncontrolledLabel>
				</Col>
			</Row>
		</Form>
	);
};
