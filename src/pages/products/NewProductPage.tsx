import { useMutation } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { useCreateProduct } from '../../services/product/hooks/useCreateProduct';
import { ProductSchemaType, productSchema } from '../../services/product/types';
import { useShopStore } from '../../services/shop/store';
import { ServerValidationError } from '../../lib/error/types';
import { Product } from '../../services/product/Product';
import { useNavigate } from 'react-router-dom';
import { ExtractErrors } from '../../lib/error/ExtractErrors';
import { SubmitHandler } from 'react-hook-form';
import { Form, Input, InputNumber } from 'antd';
import FormItem from '../../lib/form/FormItem';
import { TaxSelect } from '../../components/tax/TaxSelect';

export const NewProductPage = () => {
	const navigate = useNavigate();
	const shopId = useShopStore((state) => state.shop.id);
	const [mutationFn] = useCreateProduct(shopId);
	const { control, handleSubmit, setError } = useForm<ProductSchemaType>({
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

	return (
		<Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
			<FormItem control={control} name='name' label='Benämning'>
				<Input />
			</FormItem>
			<FormItem control={control} name='price' label='Pris (exkl. moms)'>
				<InputNumber />
			</FormItem>
			<FormItem control={control} name='tax_id' label='Moms'>
				<TaxSelect />
			</FormItem>
		</Form>
	);
};
