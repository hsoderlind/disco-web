import { FormatSummaryProps } from './types';

export const FormatSummary = ({ formats }: FormatSummaryProps) => {
	return (
		<div className='flex flex-row flex-wrap column-gap-4'>
			{formats.map((format, index) => (
				<div>
					{format.qty} x {format.name}, {format.descriptions?.join(', ')}
					{format.text ? `, ${format.text}` : null}
					{index < formats.length - 1 ? ',' : ''}
				</div>
			))}
		</div>
	);
};
