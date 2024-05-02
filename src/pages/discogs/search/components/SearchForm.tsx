import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../../../../hooks/useForm';
import { SearchSchema, searchSchema } from '../../../../services/discogs/search/types';
import { SearchFormProps } from './types';
import FormItem from '../../../../lib/form/FormItem';
import { Form, Input } from 'antd';
import { SearchProps } from 'antd/es/input';

export const SearchForm = ({ setSearchCriteria }: SearchFormProps) => {
	const { control, handleSubmit } = useForm<SearchSchema>({
		schema: searchSchema
	});

	const onSubmit: SubmitHandler<SearchSchema> = (values) => setSearchCriteria(values);

	const handleSearch: SearchProps['onSearch'] = () => {
		handleSubmit(onSubmit)();
	};

	return (
		<Form>
			<FormItem control={control} name='query' label='' noStyle>
				<Input.Search onSearch={handleSearch} enterButton placeholder='Skriv din sökfras här...' />
			</FormItem>
		</Form>
	);
};
