import { LabelSummaryProps } from './types';

export const LabelSummary = ({ labels }: LabelSummaryProps) => {
	return (
		<div className='flex flex-column'>
			{labels.map((label) => (
				<span>
					{label.name} - {label.catno}
				</span>
			))}
		</div>
	);
};
