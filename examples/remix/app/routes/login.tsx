import { getFormProps, getInputProps, useForm } from '@dinoTAX/conform-react';
import { parseWithZod } from '@dinoTAX/conform-zod';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
	remember: z.boolean().optional(),
});

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema });

	if (submission.status !== 'success') {
		return json(submission.reply());
	}

	return redirect(`/?value=${JSON.stringify(submission.value)}`);
}

export default function Login() {
	// Last submission returned by the server
	const lastResult = useActionData<typeof action>();
	const [form, fields] = useForm({
		// Sync the result of last submission
		lastResult,

		// Reuse the validation logic on the client
		onValidate({ formData }) {
			return parseWithZod(formData, { schema });
		},

		// Validate the form on blur event triggered
		shouldValidate: 'onBlur',
	});

	return (
		<Form method="post" {...getFormProps(form)}>
			<div>
				<label>Email</label>
				<input
					className={!fields.email.valid ? 'error' : ''}
					{...getInputProps(fields.email, { type: 'email' })}
				/>
				<div>{fields.email.errors}</div>
			</div>
			<div>
				<label>Password</label>
				<input
					className={!fields.password.valid ? 'error' : ''}
					{...getInputProps(fields.password, { type: 'password' })}
				/>
				<div>{fields.password.errors}</div>
			</div>
			<label>
				<div>
					<span>Remember me</span>
					<input {...getInputProps(fields.remember, { type: 'checkbox' })} />
				</div>
			</label>
			<hr />
			<button>Login</button>
		</Form>
	);
}
