import { CSSProperties, FC } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { ControllerRenderProps } from 'react-hook-form';

export type EditorProps = {
	onChange: ControllerRenderProps<any>['onChange'];
	value: ControllerRenderProps<any>['value'];
	height?: CSSProperties['height'];
};

export const Editor: FC<EditorProps> = ({ onChange, value, height = '50vh' }) => {
	return (
		<TinyMCEEditor
			apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
			cloudChannel='dev'
			init={{
				height,
				menubar: false,
				plugins: 'lists link anchor',
				toolbar:
					'formatselect | bold italic | alignleft aligncenter alignright alignjjustify | ' +
					'bullist numlist outdent indent | removeformat'
			}}
			onEditorChange={(_, editor) => onChange(editor.getContent())}
			value={value}
		/>
	);
};
