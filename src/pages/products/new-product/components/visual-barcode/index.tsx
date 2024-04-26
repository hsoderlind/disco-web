import { FC, useEffect, useState } from 'react';
import { Format, VisualBarcodeProps } from './types';
import { useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../../../services/product/types';
import Barcode from 'react-barcode';
import { useLoadBarcodeTypes } from '../../../../../services/barcode-type/hooks/useLoadBarcodeTypes';
import { canGenerateBarcodeGraphic } from '../../../../../services/barcode-type/formats';

export const VisualBarcode: FC<VisualBarcodeProps> = ({ id, name, formatFrom, ...props }) => {
	const [format, setFormat] = useState<string | null>(null);
	const { watch } = useFormContext<ProductSchemaType>();
	const { data: barcodeTypes } = useLoadBarcodeTypes();
	const value = watch(name);
	const barcodeTypeValue = watch(formatFrom);

	useEffect(() => {
		if (barcodeTypeValue && barcodeTypes) {
			const barcodeType = barcodeTypes.find(barcodeTypeValue);
			barcodeType && setFormat(barcodeType?.get<string>('format'));
		}
	}, [barcodeTypeValue, barcodeTypes, setFormat]);

	if (value.length === 0 || !format) {
		return null;
	}

	if (format && !canGenerateBarcodeGraphic(format)) {
		return null;
	}

	return (
		<div id={id} className='mb-input'>
			<Barcode {...props} format={format as Format} value={value} />
		</div>
	);
};
