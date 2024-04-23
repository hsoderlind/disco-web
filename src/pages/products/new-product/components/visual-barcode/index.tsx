import { FC } from 'react';
import { VisualBarcodeProps } from './types';
import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import Barcode from 'react-barcode';

export const VisualBarcode: FC<VisualBarcodeProps> = ({ name, ...props }) => {
	const { watch } = useFormContext<ProductSchemaType>();
	const value = watch(name);

	if (value.length === 0) {
		return null;
	}

	return <Barcode {...props} value={value} />;
};
