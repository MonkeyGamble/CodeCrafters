import React from 'react';
import { useForm } from 'react-hook-form';
import errorIcon from '../../assets/img/x-octagonn.png';

export default function SubmitForm({ style, button }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
		setError,
	} = useForm({
		mode: 'onSubmit',
	});

	const onSubmit = data => {
		if (!data.name || !data.phoneNumber || !data.email) {
			setError('submit', {
				type: 'manual',
				message: 'Wrong input. Try again.',
			});
		} else {
			console.log(data);
			reset();
		}
	};

	const name_input = register('name', {
		required: '',
		minLength: {
			value: 5,
			message: 'Имя не может быть короче 5 символов',
		},
	});

	const phone_input = register('phoneNumber', {
		required: '',
		pattern: {
			value: /^\+?[0-9]+$/,
			message: 'Номер телефона может содержать только цифры и знак +',
		},
	});

	const email_input = register('email', {
		required: '',
		pattern: {
			value:
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
			message: 'Почта введена неверно',
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<div>
				<label>
					<input
						{...name_input}
						placeholder='Name'
						className={errors.name ? style.error : style.input}
					/>
				</label>
				{errors.name && (
					<p className={style.errorMessage}>{errors.name.message}</p>
				)}
			</div>

			<div>
				<label>
					<input
						{...phone_input}
						placeholder='Phone number'
						className={errors.phoneNumber ? style.error : style.input}
					/>
				</label>
				{errors.phoneNumber && (
					<p className={style.errorMessage}>{errors.phoneNumber.message}</p>
				)}
			</div>

			<div>
				<label>
					<input
						{...email_input}
						placeholder='Email'
						className={errors.email ? style.error : style.input}
					/>
				</label>
				{errors.email && (
					<p className={style.errorMessage}>{errors.email.message}</p>
				)}
			</div>

			{errors.submit && (
				<span className={style.errorMessage}>
					<img src={errorIcon} alt='Error icon' className={style.errorIcon} />{' '}
					Wrong input. Try again
				</span>
			)}

			{isSubmitSuccessful && (
				<p className={style.successMessage}>
					The discount has been successfully sent by email
				</p>
			)}
			<div>
				<input type='submit' className={style.submitButton} value={button} />
			</div>
		</form>
	);
}
