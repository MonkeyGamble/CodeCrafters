import React from 'react';
import s from './DiscountUserForm.module.css';
import SubmitForm from '../../../UI/SubmitForm/index';
import { sendSaleRequest } from '../../../../redux/actions/postRequests';
import '../../../../styles/Global.css';

export default function DiscountUserForm() {
	const handleSaleSubmit = async data => {
		const saleData = {
			name: data.name,
			email: data.email,
		};

		const response = await sendSaleRequest(saleData);
		return response;
	};

	return (
		<section className='content_line'>
			<div className={s.discount_user_form}>
				<h2 className={s.first_order}>5% off on the first order</h2>
				<div className={s.form_wrapper}>
					<SubmitForm
						style={s}
						button='Get a discount'
						onSuccess='The discount has been successfully sent by email'
						submitFunction={handleSaleSubmit} // Передача функции для отправки данных на скидку
					/>
				</div>
			</div>
		</section>
	);
}
