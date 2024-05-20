import { useFormContext } from 'react-hook-form';
import { LogotypeSchema, LogotypeUploadProps } from '../../types';
import { UploadHero } from '../../../../../../components/forms/controls/upload/UploadHero';
import { LogotypePreview } from '../preview';
import { File } from '../../../../../../services/file/File';

export const LogotypeUpload = (props: LogotypeUploadProps) => {
	const { setValue, register, watch } = useFormContext<LogotypeSchema>();
	register('logotype');
	const files = watch('logotype');

	const remove = async (index: number) => {
		const file = files[index];

		if (files) {
			await file.get<File>('model').delete();
		}

		files.splice(index, 1);
		setValue('logotype', files);
	};

	return (
		<>
			<UploadHero {...props} onDrop={(files) => setValue('logotype', files)} />
			{files && files.map((file, index) => <LogotypePreview file={file} index={index} remove={remove} />)}
		</>
	);
};
