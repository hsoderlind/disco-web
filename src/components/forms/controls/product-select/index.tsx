import { forwardRef, useCallback, useMemo } from 'react';
import { ProductSelectProps, SelectRef } from './types';
import { useListProductsSummary } from '../../../../services/product/hooks/useListProductsSummary';
import { Select, Tag, Typography } from 'antd';
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
			const stock = product?.stock();

			if (typeof stock !== 'undefined' && !stock.inStock() && !stock.get<boolean>('allow_order_out_of_stock')) {
				option.data.disabled = true;
			}

			return (
				<div {...option.data}>
					<div className='flex justify-between'>
						<div>{product?.get<string>('name')}</div>
						<div className='flex flex-row'>
							{typeof stock !== 'undefined' ? (
								<>
									<Tag color={stock.inStock() ? 'green' : 'orange'}>
										{stock.inStock()
											? stock.get<string>('in_stock_message')
											: stock.get<string>('out_of_stock_message')}
									</Tag>
									<div>
										<Typography.Text type='secondary'>Disp. antal:</Typography.Text>{' '}
										{Num.decimal(stock?.get<number>('available_quantity') ?? 0)}
									</div>
								</>
							) : (
								<Typography.Text type='secondary'>Ej lagerförd</Typography.Text>
							)}
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
