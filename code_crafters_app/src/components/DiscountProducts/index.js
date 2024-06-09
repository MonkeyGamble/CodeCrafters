import '../../Global.css';
import like from '../../assets/img/like_white.png';
import shopping_cart from '../../assets/img/shopping_cart_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../index';

export default function DiscountProducts({ products, header, styles }) {
	return (
		<div className={`${styles.sale_container} content_line`}>
			<div className={styles.component_header}>
				<h1>{header}</h1>

				<div className={styles.line}></div>

				<Link to='/all_sales'>
					<button>All sales</button>
				</Link>
			</div>

			<div className={styles.filter}>
				<div className={styles.filter_price}>
					<p>Price</p>
					<input type='text' placeholder='from' />
					<input type='text' placeholder='to' />
				</div>

				<div className={styles.filter_sort}>
					<label for='filter_sort'>Sorted</label>
					<select id='filter_sort' name='options'>
						<option value='option1'>by default</option>
						<option value='option2'>Price from Low to High</option>
						<option value='option3'>Price for High to Low</option>
					</select>
				</div>
			</div>

			<div className={styles.cards_container}>
				{products.map(product => (
					<div key={product.id} className={styles.card}>
						<div
							className={styles.product_picture}
							style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
						>
							<div className={styles.discount_size}>
								-{Math.round((1 - product.discont_price / product.price) * 100)}
								%
							</div>
							<div className={styles.like_cart}>
								<img src={like} alt='like' />
								<img src={shopping_cart} alt='cart' />
							</div>
						</div>

						<div className={styles.product_description}>
							<h3>{product.title}</h3>
							<div className={styles.price}>
								<h2>${product.discont_price}</h2>
								<h5>${product.price}</h5>
							</div>
						</div>
					</div>
				))}
			</div>

			<button className={styles.button_340}>All sales</button>
		</div>
	);
}
