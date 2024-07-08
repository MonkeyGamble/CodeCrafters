
import React, { useState } from 'react';
import { postData } from '../../asyncActions/postRequests';

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
      products: ['Product 1', 'Product 2'] // Пример массива заказанных товаров
    };

    const response = await postData(endpoint, orderData);
    console.log('Server response:', response);
    setServerResponse(response);
  };

  return (
    <div>
      <h2>Order Form</h2>
      <form onSubmit={(e) => handleSubmit(e, '/order/send')}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Submit Order</button>
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





/*







 */


/*

import React, { useState } from 'react';
import { sendSaleRequest, sendOrderRequest } from '../../asyncActions/postRequests';

const FormComponent = () => {
  const [saleData, setSaleData] = useState({ field1: '', field2: '' });
  const [orderData, setOrderData] = useState({ field1: '', field2: '' });

  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setSaleData({ ...saleData, [name]: value });
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendSaleRequest(saleData);
      console.log('Sale request successful:', response);
    } catch (error) {
      console.error('Sale request failed:', error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendOrderRequest(orderData);
      console.log('Order request successful:', response);
    } catch (error) {
      console.error('Order request failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSaleSubmit}>
        <h2>Sale Request</h2>
        <input
          type="text"
          name="field1"
          value={saleData.field1}
          onChange={handleSaleChange}
          placeholder="Field 1"
        />
        <input
          type="text"
          name="field2"
          value={saleData.field2}
          onChange={handleSaleChange}
          placeholder="Field 2"
        />
        <button type="submit">Send Sale Request</button>
      </form>

      <form onSubmit={handleOrderSubmit}>
        <h2>Order Request</h2>
        <input
          type="text"
          name="field1"
          value={orderData.field1}
          onChange={handleOrderChange}
          placeholder="Field 1"
        />
        <input
          type="text"
          name="field2"
          value={orderData.field2}
          onChange={handleOrderChange}
          placeholder="Field 2"
        />
        <button type="submit">Send Order Request</button>
      </form>

      <button onClick={handleSaleSubmit}>Submit Sale Request</button>
      <button onClick={handleOrderSubmit}>Submit Order Request</button>
    </div>
  );
};

export default FormComponent;

*/