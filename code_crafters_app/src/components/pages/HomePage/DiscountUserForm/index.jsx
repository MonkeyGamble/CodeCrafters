import s from './DiscountUserForm.module.css';
import SubmitForm from '../../../SubmitForm/index';

export default function DiscountUserForm() {
	return (
		<div className={s.discount_user_form}>
			<h2 className={s.first_order}>5% off on the first order</h2>
			<div className={s.form_wrapper}>
				<SubmitForm
					style={s}
					button='Get a discount'
					onSuccess='The discount has been successfully sent by email'
				/>
			</div>
		</div>
	);
}
