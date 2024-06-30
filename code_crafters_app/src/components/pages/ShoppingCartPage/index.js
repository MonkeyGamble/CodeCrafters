import s from './ShoppingCartPage.module.css';
import '../../../Global.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useBasketActions } from '../../../asyncActions/basket';
import { ROOT_URL } from '../../..';
import Counter from '../../Counter';
import { FaXmark } from 'react-icons/fa6';
import {
	incrementProductCountAction,
	decrementProductCountAction,
} from '../../../store/basketReducer';
import SubmitForm from '../../SubmitForm/index.jsx';

export default function ShoppingCartPage() {
	const dispatch = useDispatch();
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

	console.log('Basket Items: ', basketItems);
	console.log('Basket TotalPrice: ', basketPrice);

	return (
		<div className={`${s.shopping_cart_wrapper} content_line`}>
			<div className={s.component_header}>
				<h1>Shopping cart</h1>
				<div className={s.line}></div>
				<Link to='/'>
					<button>Back to the store</button>
				</Link>
			</div>

			<div className={s.shopping_cart_content}>
				<div className={s.basket_products}>
					{basketItems.map(product => (
						<div key={product.id} className={s.product_item}>
							<img src={ROOT_URL + product.image} alt={product.title} />

							<div className={s.product_description}>
								<div className={s.product_header_section}>
									<p>{product.title}</p>
									<FaXmark
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
					/>
				</div>
			</div>
		</div>
	);
}
