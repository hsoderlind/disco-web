export const DEFAULT_FORMATS = [
	'MPN',
	'UPC',
	'EAN-2',
	'EAN-5',
	'EAN-8',
	'EAN-13',
	'CODE128',
	'CODE128A',
	'CODE128B',
	'CODE128C',
	'CODE39',
	'ITF-14',
	'MSI',
	'MSI10',
	'MSI11',
	'MSI1010',
	'MSI1110',
	'Pharmacode',
	'Codebar',
	'Label Code',
	'Matrix / Runout',
	'Mastering SID Code',
	'Mould SID Code',
	'Pressing Plant ID',
	'Distribution Code',
	'Price Code',
	'SPARS Code',
	'Depósito Legal',
	'ASIN',
	'ISRC',
	'Rights Society',
	'Övrigt'
].sort();

export const DEFAULT_FORMAT = 'CODE128';

export function canGenerateBarcodeGraphic(format: string) {
	const productTypesIsNotBarcodes = [
		'MPN',
		'Label Code',
		'Matrix / Runout',
		'Mastering SID Code',
		'Mould SID Code',
		'Pressing Plant ID',
		'Distribution Code',
		'Price Code',
		'SPARS Code',
		'Depósito Legal',
		'ASIN',
		'ISRC',
		'Rights Society',
		'Other'
	];

	return DEFAULT_FORMATS.includes(format) && !productTypesIsNotBarcodes.includes(format);
}
