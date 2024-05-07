import QuillEditor, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditorProps } from './types';
import './editor.scss';
import { useMemo } from 'react';

export const Editor = ({ onChange, value, height = '80vh' }: EditorProps) => {
	const modules: ReactQuillProps['modules'] = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [2, 3, 4, false] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ color: [] }],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
					['link', 'image', 'video']
				]
			}
		}),
		[]
	);

	return (
		<QuillEditor
			className={'editor'}
			modules={modules}
			theme='snow'
			style={{ height }}
			value={value}
			onChange={(value) => onChange(value)}
		/>
	);
};
