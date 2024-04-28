import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProductSchemaType } from '../../../services/product/types';
import { Col, Input, Row, Typography } from 'antd';
import FormItem from '../../../lib/form/FormItem';
import { CategorySelect } from '../../../components/forms/controls/CategorySelect';
import { UncontrolledLabel } from '../../../components/forms/UncontrolledLabel';
import { Editor } from '../../../components/forms/controls/Editor';

export const Description: FC = () => {
	const { control } = useFormContext<ProductSchemaType>();

	return (
		<>
			<Typography.Title level={2}>Beskrivning</Typography.Title>
			<Row gutter={[12, 0]}>
				<Col xl={12}>
					<FormItem control={control} name='name' label='Benämning'>
						<Input autoFocus />
					</FormItem>
				</Col>
				<Col xl={12}>
					<FormItem control={control} name='categories' label='Kategori(er)'>
						<CategorySelect treeCheckable />
					</FormItem>
				</Col>
			</Row>
			<FormItem control={control} name='summary' label='Kort beskrivning'>
				<Input.TextArea rows={6} />
			</FormItem>
			<Controller
				control={control}
				name='description'
				render={({ field }) => (
					<UncontrolledLabel htmlFor='description' label='Beskrivning'>
						<Editor onChange={field.onChange} value={field.value} />
					</UncontrolledLabel>
				)}
			/>
		</>
	);
};
