import s from './DiscountUserForm.module.css';
import React, { useState } from 'react';

export default function DiscountUserForm() {

  const submit = e => {
	e.preventDefault();

	const { name, phonenumber, email } = e.target;

    const new_user = {
		id: Date.now(),
		name: name.value,
		phonenumber: phonenumber.value,
		email: email.value
	}

     console.log(new_user); 

	e.target.reset();
  }

	return (
      
        <div className={s.discount_user_form}>
			
			   <h2>5% off on the first order</h2>
			
	          <form className={s.form} onSubmit={submit}>
                 <input type='text' placeholder='Name'/>
                 <input type='text' placeholder='Phone number'/>
                 <input type='text' placeholder='Email'/>
                 <button>Get a discount</button>
              </form>

		</div>		
		
		
	);
}
	