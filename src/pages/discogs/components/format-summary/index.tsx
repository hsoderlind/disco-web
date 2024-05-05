import { FormatSummaryProps } from './types';

export const FormatSummary = ({ formats }: FormatSummaryProps) => {
	return (
		<div className='flex flex-column'>
			{formats.map((format) => (
				<div>
					{format.qty} x {format.name}, {format.descriptions?.join(', ')}
					{format.text ? `, ${format.text}` : null}
				</div>
			))}
		</div>
	);
};
