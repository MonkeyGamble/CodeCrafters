import s from './ProductCard.module.css';
import '../../Global.css';
import like from '../../assets/img/like_white.png';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../..';
import Basket from '../Basket';
import { useBasketActions } from '../../asyncActions/basket';

export default function ProductCard({ product, ...otherProps }) {
	const { addProductToBasket } = useBasketActions();

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
	};
	const handleBasketClick = e => {
		e.stopPropagation();
		addProductToBasket(product);
	};

	return (
		<Link
			to={`/products/${product.id}`}
			className={s.card}
			onClick={handleCardClick}
			{...otherProps}
		>
			<div
				className={s.product_picture}
				style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
			>
				<div className={s.discount_size}>
					-{Math.round((1 - product.discont_price / product.price) * 100)}%
				</div>
				<div className={s.like_cart}>
					<img src={like} alt='like' />
					<Basket product={product} onClick={handleBasketClick} />
				</div>
			</div>

			<div className={s.product_description}>
				<h3>{product.title}</h3>
				<div className={s.price}>
					<h2>${product.discont_price}</h2>
					<h5>${product.price}</h5>
				</div>
			</div>
		</Link>
	);
}
