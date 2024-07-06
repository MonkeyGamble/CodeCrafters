import React, { useState } from 'react';
import { postData } from '../../redux/actions/postRequests';

const OrderForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [serverResponse, setServerResponse] = useState('');

	const handleSubmit = async (event, endpoint) => {
		event.preventDefault();

		const orderData = {
			name: `${firstName} ${lastName}`,
			phoneNumber,
			email,
			products: ['Product 1', 'Product 2'], // Пример массива заказанных товаров
		};

		const response = await postData(endpoint, orderData);
		console.log('Server response:', response);
		setServerResponse(response);
	};

	return (
		<div>
			<h2>Order Form</h2>
			<form onSubmit={e => handleSubmit(e, '/order/send')}>
				<div>
					<label>First Name:</label>
					<input
						type='text'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						type='text'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<label>Phone Number:</label>
					<input
						type='text'
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<button type='submit'>Submit Order</button>
			</form>
			{serverResponse && (
				<div>
					<h3>Server Response</h3>
					<p>Message: {serverResponse.message}</p>
					<p>Customer Info:</p>
					<ul>
						<li>Name: {serverResponse.customer.name}</li>
						<li>Phone: {serverResponse.customer.phoneNumber}</li>
						<li>Email: {serverResponse.customer.email}</li>
					</ul>
					<p>Products:</p>
					<ul>
						{serverResponse.products.map((product, index) => (
							<li key={index}>{product}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default OrderForm;
