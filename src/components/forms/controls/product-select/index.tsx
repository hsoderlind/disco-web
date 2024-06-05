import { forwardRef, useCallback, useMemo } from 'react';
import { ProductSelectProps, SelectRef } from './types';
import { useListProductsSummary } from '../../../../services/product/hooks/useListProductsSummary';
import { Select, Typography } from 'antd';
import { Num } from '../../../../lib/number/Num';
import { DefaultOptionType } from 'antd/es/select';

export const ProductSelect = forwardRef<SelectRef, ProductSelectProps>(
	({ category, includeSubcategories, state, onChange, ...props }, ref) => {
		const { data: products, isFetching, isLoading } = useListProductsSummary({ category, includeSubcategories, state });

		const options = useMemo(() => {
			return typeof products !== 'undefined'
				? products.getItems().map((model) => ({
						value: model.getKey(),
						label: model.get<string>('name')
				  }))
				: undefined;
		}, [products]);

		const optionRenderer: ProductSelectProps['optionRender'] = (option) => {
			const product = products?.find(option.value as number);

			return (
				<div {...option.data}>
					<div className='flex justify-between'>
						<div>{product?.get<string>('name')}</div>
						<div>
							<Typography.Text type='secondary'>Disp. antal:</Typography.Text>{' '}
							{Num.decimal(product?.stock()?.get<number>('disposable_quantity') ?? 0)}
						</div>
					</div>
				</div>
			);
		};

		const filterOption = useCallback(
			(input: string, option: DefaultOptionType) => {
				if (typeof option === 'undefined' || typeof option.label === 'undefined') {
					return false;
				}

				if (typeof products === 'undefined') {
					return false;
				}

				const result = products.filter(
					(product) => product.get<string>('name').includes(input) && product.getKey() === option.value
				);

				return result.length > 0;
			},
			[products]
		);

		const handleChange = useCallback(
			(value: number) => {
				const product = products?.find(value);
				onChange?.(product!);
			},
			[products, onChange]
		);

		return (
			<Select
				ref={ref}
				{...props}
				showSearch
				optionFilterProp='label'
				filterOption={filterOption as ProductSelectProps['filterOption']}
				loading={isFetching || isLoading}
				options={options}
				optionRender={optionRenderer}
				onChange={handleChange}
			/>
		);
	}
);
