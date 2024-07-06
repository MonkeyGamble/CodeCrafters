import React, { useState } from 'react';
import s from './ShoppingCartPage.module.css';
import '../../../styles/Global.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useBasketActions } from '../../../redux/actions/basket.jsx';
import { ROOT_URL } from '../../../index.js';
import Counter from '../../UI/Counter/index.jsx';
import { FaTimes } from 'react-icons/fa';
import {
	incrementProductCountAction,
	decrementProductCountAction,
} from '../../../redux/reducers/basketReducer.jsx';
import SubmitForm from '../../UI/SubmitForm/index.jsx';
import { clearBasketAction } from '../../../redux/reducers/basketReducer.jsx';
import DailyDealModal from '../../Widgets/ModalWindow/index.jsx';
import { sendOrderRequest, sendSaleRequest } from '../../../asyncActions/postRequests.jsx'; 

export default function ShoppingCartPage() {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const basketItems = useSelector(state => state.basket.basket.items);
	const basketPrice = useSelector(state => state.basket.basket.totalPrice);
	const { removeProductFromBasket } = useBasketActions();

	const handleRemoveProduct = id => {
		removeProductFromBasket(id);
	};

	const handleIncrement = id => {
		dispatch(incrementProductCountAction(id));
	};

	const handleDecrement = id => {
		dispatch(decrementProductCountAction(id));
	};

	const totalItemsInBasketCount = basketItems.reduce(
		(total, product) => total + product.count,
		0
	);

	const handleOrderSuccess = async () => {
		
		const orderData = {
			name: 'Customer Name', 
			phoneNumber: 'Customer Phone', 
			email: 'Customer Email', 
			products: basketItems.map(item => ({
				id: item.id,
				count: item.count,
				price: item.price,
				discont_price: item.discont_price
			})),
			totalPrice: basketPrice,
		};

		
		const result = await sendOrderRequest(orderData);
		console.log(result);

		
		dispatch(clearBasketAction());
		setShowModal(true);
	};

	const handleSaleRequest = async () => {
		// Отправляем запрос на купон
		const saleData = {
			name: 'Customer Name', 
			email: 'Customer Email', 
		};

		const result = await sendSaleRequest(saleData);
		console.log(result);
	};

	return (
		<div className={`${s.shopping_cart_wrapper} content_line`}>
			<div className={s.component_header}>
				<h1>Shopping cart</h1>
				<div className={s.line}></div>
			</div>

			{basketItems.length === 0 ? (
				<div className={s.empty_cart}>
					<p>Looks like you have no items in your basket currently.</p>
					<Link to='/all_products'>
						<button>Continue Shopping</button>
					</Link>
				</div>
			) : (
				<div className={s.shopping_cart_content}>
					<div className={s.basket_products}>
						{basketItems.map(product => (
							<div key={product.id} className={s.product_item}>
								<img src={ROOT_URL + product.image} alt={product.title} />

								<div className={s.product_description}>
									<div className={s.product_header_section}>
										<p>{product.title}</p>
										<FaTimes
											className={s.xmark}
											onClick={() => handleRemoveProduct(product.id)}
										/>
									</div>

									<div className={s.product_price_section}>
										<Counter
											count={product.count}
											onIncrement={() => handleIncrement(product.id)}
											onDecrement={() => handleDecrement(product.id)}
										/>
										<div className={s.price}>
											{product.discont_price ? (
												<>
													<p>${product.discont_price}</p>
													<p>${product.price}</p>
												</>
											) : (
												<p
													style={{
														fontSize: '40px',
														fontWeight: '600',
														textDecoration: 'none',
														color: 'var(--text_black)',
													}}
												>
													${product.price}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={s.order_details}>
						<h2>Order details</h2>
						<h3>{totalItemsInBasketCount} items</h3>
						<div className={s.total}>
							<h3>Total</h3>
							<p className={s.total_price}>${basketPrice.toFixed(2)}</p>
						</div>
						<SubmitForm
							style={s}
							button='Order'
							onSuccess='Ordered successfully'
							onSuccessAction={handleOrderSuccess} // Передача функции для обработки успешного заказа
						/>
						<button onClick={handleSaleRequest}>Get Coupon</button> {/* Кнопка для отправки заявки на купон */}
					</div>
				</div>
			)}

			{showModal && (
				<DailyDealModal
					isOpen={true}
					onRequestClose={() => setShowModal(false)}
					type='ordered_successfully'
				/>
			)}
		</div>
	);
}

/*



import React, { useState } from 'react';
import s from './ShoppingCartPage.module.css';
import '../../../styles/Global.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useBasketActions } from '../../../redux/actions/basket.jsx';
import { ROOT_URL } from '../../../index.js';
import Counter from '../../UI/Counter/index.jsx';
import { FaTimes } from 'react-icons/fa';
import {
	incrementProductCountAction,
	decrementProductCountAction,
} from '../../../redux/reducers/basketReducer.jsx';
import SubmitForm from '../../UI/SubmitForm/index.jsx';
import { clearBasketAction } from '../../../redux/reducers/basketReducer.jsx';
import DailyDealModal from '../../Widgets/ModalWindow/index.jsx';

export default function ShoppingCartPage() {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const basketItems = useSelector(state => state.basket.basket.items);
	const basketPrice = useSelector(state => state.basket.basket.totalPrice);
	const { removeProductFromBasket } = useBasketActions();

	const handleRemoveProduct = id => {
		removeProductFromBasket(id);
	};

	const handleIncrement = id => {
		dispatch(incrementProductCountAction(id));
	};

	const handleDecrement = id => {
		dispatch(decrementProductCountAction(id));
	};

	const totalItemsInBasketCount = basketItems.reduce(
		(total, product) => total + product.count,
		0
	);

	const handleOrderSuccess = () => {
		// Очистка корзины после успешного заказа
		dispatch(clearBasketAction());
		setShowModal(true);
	};

	return (
		<div className={`${s.shopping_cart_wrapper} content_line`}>
			<div className={s.component_header}>
				<h1>Shopping cart</h1>
				<div className={s.line}></div>
			</div>

			{basketItems.length === 0 ? (
				<div className={s.empty_cart}>
					<p>Looks like you have no items in your basket currently.</p>
					<Link to='/all_products'>
						<button>Continue Shopping</button>
					</Link>
				</div>
			) : (
				<div className={s.shopping_cart_content}>
					<div className={s.basket_products}>
						{basketItems.map(product => (
							<div key={product.id} className={s.product_item}>
								<img src={ROOT_URL + product.image} alt={product.title} />

								<div className={s.product_description}>
									<div className={s.product_header_section}>
										<p>{product.title}</p>
										<FaTimes
											className={s.xmark}
											onClick={() => handleRemoveProduct(product.id)}
										/>
									</div>

									<div className={s.product_price_section}>
										<Counter
											count={product.count}
											onIncrement={() => handleIncrement(product.id)}
											onDecrement={() => handleDecrement(product.id)}
										/>
										<div className={s.price}>
											{product.discont_price ? (
												<>
													<p>${product.discont_price}</p>
													<p>${product.price}</p>
												</>
											) : (
												<p
													style={{
														fontSize: '40px',
														fontWeight: '600',
														textDecoration: 'none',
														color: 'var(--text_black)',
													}}
												>
													${product.price}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={s.order_details}>
						<h2>Order details</h2>
						<h3>{totalItemsInBasketCount} items</h3>
						<div className={s.total}>
							<h3>Total</h3>
							<p className={s.total_price}>${basketPrice.toFixed(2)}</p>
						</div>
						<SubmitForm
							style={s}
							button='Order'
							onSuccess='Ordered successfully'
							onSuccessAction={handleOrderSuccess} // Передача функции для обработки успешного заказа
						/>
					</div>
				</div>
			)}

			{showModal && (
				<DailyDealModal
					isOpen={true}
					onRequestClose={() => setShowModal(false)}
					type='ordered_successfully'
				/>
			)}
		</div>
	);
}
*/