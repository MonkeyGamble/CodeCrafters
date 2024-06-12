import s from './ShoppingCartPage.module.css';
import '../../../Global.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ShoppingCartPage() {
	const basketItems = useSelector(state => state.basket.basket.items);
	const basketPrice = useSelector(state => state.basket.basket.totalPrice);
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
							<p>{product.title}</p>
							<p>Цена: ${product.price}</p>
							<p>Количество: {product.count}</p>
							<button>Удалить</button>
						</div>
					))}
				</div>
				<div className={s.order_details}>
					<h2>Order details</h2>
					<h3> items</h3>
					<div className={s.total}>
						<h3>Total</h3>
						<p className={s.total_price}>Price</p>
					</div>
					<div className={s.form}>Форма</div>
				</div>
			</div>
		</div>
	);
}
