import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import errorIcon from '../../../assets/img/x-octagonn.png';

export default function SubmitForm({
	style,
	button,
	onSuccess,
	onSuccessAction,
	submitFunction, // Добавляем параметр для функции отправки POST-запроса
}) {
	const [buttonText, setButtonText] = useState(button);
	const [fontSize, setFontSize] = useState('20px');
	const [submitError, setSubmitError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
		setError,
	} = useForm({
		mode: 'onSubmit',
	});

	const onSubmit = async data => {
		if (!data.name || !data.phoneNumber || !data.email) {
			setSubmitError('Wrong input. Try again.');
			setError('submit', {
				type: 'manual',
				message: 'Wrong input. Try again.',
			});
		} else {
			try {
				// Используем переданную функцию для отправки данных
				const response = await submitFunction(data);
				console.log('Server response:', response);

				reset();
				clearErrors();
				setSubmitError('');
				setButtonText(onSuccess);
				setFontSize('16px');
				if (typeof onSuccessAction === 'function') {
					onSuccessAction(); // Вызываем функцию обработки успешного заказа
				}
			} catch (error) {
				setSubmitError('An error occurred while submitting the form.');
				console.error('Form submission error:', error);
			}
		}
	};

	const name_input = register('name', {
		required: 'This field is required',
		minLength: {
			value: 2,
			message: 'The name cannot be shorter than 2 characters',
		},
	});

	const phone_input = register('phoneNumber', {
		required: 'This field is required',
		pattern: {
			value: /^\+?[0-9]+$/,
			message: 'The phone number can only contain numbers and a + sign',
		},
	});

	const email_input = register('email', {
		required: 'This field is required',
		pattern: {
			value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
			message: 'Email entered incorrectly',
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<div className={style.inputContainer}>
				<label className={style.label}>
					<input
						{...name_input}
						placeholder='Name'
						className={`${style.input} ${errors.name ? style.error : ''}`}
					/>
					{errors.name && (
						<span className={style.errorMessage}>{errors.name.message}</span>
					)}
				</label>
			</div>

			<div className={style.inputContainer}>
				<label className={style.label}>
					<input
						{...phone_input}
						placeholder='Phone number'
						className={`${style.input} ${
							errors.phoneNumber ? style.error : ''
						}`}
					/>
					{errors.phoneNumber && (
						<span className={style.errorMessage}>
							{errors.phoneNumber.message}
						</span>
					)}
				</label>
			</div>

			<div className={style.inputContainer}>
				<label className={style.label}>
					<input
						{...email_input}
						placeholder='Email'
						className={`${style.input} ${errors.email ? style.error : ''}`}
					/>
					{errors.email && (
						<span className={style.errorMessage}>{errors.email.message}</span>
					)}
				</label>
			</div>

			{submitError && (
				<span className={style.submitErrorMessage}>
					<img src={errorIcon} alt='Error icon' className={style.errorIcon} />{' '}
					{submitError}
				</span>
			)}

			<div className={style.buttonContainer}>
				<input
					type='submit'
					className={style.submitButton}
					value={buttonText}
					style={{ fontSize }}
				/>
			</div>
		</form>
	);
}
