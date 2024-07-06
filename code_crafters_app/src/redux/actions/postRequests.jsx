import { ROOT_URL } from '../../index';

export const sendOrderRequest = async orderData => {
	try {
		const response = await fetch(`${ROOT_URL}order/send`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};

export const sendSaleRequest = async saleData => {
	try {
		const response = await fetch(`${ROOT_URL}sale/send`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(saleData),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};
