import { FieldMetadata, getTextareaProps } from '@dinoTAX/conform-react';
import { Textarea } from '@/components/ui/textarea';
import { ComponentProps } from 'react';

export const TextareaConform = ({
	meta,
	...props
}: {
	meta: FieldMetadata<string>;
} & ComponentProps<typeof Textarea>) => {
	return <Textarea {...getTextareaProps(meta)} {...props} />;
};
