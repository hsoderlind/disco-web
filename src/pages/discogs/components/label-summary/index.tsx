import { LabelSummaryProps } from './types';

export const LabelSummary = ({ labels }: LabelSummaryProps) => {
	return (
		<div className='flex flex-row flex-wrap column-gap-4'>
			{labels.map((label, index) => (
				<span>
					{label.name} ({label.catno}){index < labels.length - 1 ? ',' : ''}
				</span>
			))}
		</div>
	);
};
