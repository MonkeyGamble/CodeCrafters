import s from './DiscountUserForm.module.css';
import SubmitForm from '../../../SubmitForm/index';

export default function DiscountUserForm() {
	return (
		<div className={s.discount_user_form}>
			<h2 className={s.first_order}>5% off on the first order</h2>
			<div className='form_wrapper'>
				<SubmitForm style={s} button='Get a discount' />
			</div>
		</div>
	);
}

/*

import s from './DiscountUserForm.module.css';
import { useForm } from 'react-hook-form';

export default function DiscountUserForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitSuccessful },
    reset,
    setError
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = data => {
    if (!data.name || !data.phoneNumber || !data.email) {
      setError("submit", {
        type: "manual",
        message: "Wrong input. Try again."
      });
    } else {
      console.log(data);
      reset();
    }
  }

  const name_input = register('name', {
    required: '',
    minLength: {
      value: 5,
      message: 'Имя не может быть короче 5 символов'
    }
  });

  const phone_input = register('phoneNumber', {
    required: '',
    pattern: {
      value: /^[0-9]+$/,
      message: 'Номер телефона должен содержать только цифры'
    }
  });

  const email_input = register('email', {
    required: '',
    pattern: {
      value: /^\w+[@]\w+[.]\w{2,5}$/,
      message: 'Почта сформирована неверно'
    }
  });

  return (
    <div className={s.discount_user_form}>
      <h2>5% off on the first order</h2>
      <div className='form_wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          
		  <div>
            <label>
              <input {...name_input} placeholder="Name"
                className={errors.name ? s.error : ''}/>
            </label>
            {errors.name && <p className={s.errorMessage}>{errors.name.message}</p>}
          </div>

          <div>
			<label>
            <input
              {...phone_input}
              placeholder="Phone number"
              className={errors.phoneNumber ? s.error : s.input}
            />
			</label>
            {errors.phoneNumber && <p className={s.errorMessage}>{errors.phoneNumber.message}</p>}
          </div>

          <div>
			<label>
            <input
              {...email_input}
              placeholder="Email"
              className={errors.email ? s.error : s.input}
            />
			</label>
            {errors.email && <p className={s.errorMessage}>{errors.email.message}</p>}
          </div>

          {errors.submit && (
		  <span className={s.errorMessage}>Wrong input. Try again</span>)}

          {isSubmitSuccessful && (
            <p className={s.successMessage}>The discount has been successfully sent by email</p>
          )}
          <div>
            <input type='submit' className={s.submitButton} value="Get a discount"/>
          </div>
        </form>
      </div>
    </div>
  );
}



*/

/*

import s from './DiscountUserForm.module.css';
import { useForm } from 'react-hook-form';

export default function DiscountUserForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = data => {

	if (!data.name || !data.phoneNumber || !data.email) {
          setError("submit", {
		  type: "manual",
		  message: "Wrong input. Try again."
		});
	  } else {
		console.log(data);
		 reset();
		// Здесь можно отправить данные на сервер или выполнить другое действие
	  }
   
  }

  const name_input = register('name', {
    required: '',
    minLength: {
      value: 5,
      message: 'Имя не может быть короче 5 символов'
    }
  });

  return (
    <div className={s.discount_user_form}>
      <h2>5% off on the first order</h2>
      <div className='form_wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div>
            <label>
            
              <input {...name_input} placeholder="Name"
 className={errors.name && s.error}/>
            </label>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <input
              {...register("phoneNumber", { required: true })}
              placeholder="Phone number"
              className={s.input}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className={s.input}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

		  {errors.submit && <span className={s.errorMessage}>Wrong input. Try again.</span>}

          {isSubmitSuccessful && (
            <p className={s.successMessage}>The discount has been successfully sent by email</p>
          )}
          <div>
            <input type='submit' className={s.submitButton} value="Get a discount"/>
          </div>
        </form>
      </div>
    </div>
  );
}

*/
