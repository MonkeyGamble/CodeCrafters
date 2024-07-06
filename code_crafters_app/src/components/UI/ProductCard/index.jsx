import s from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../../index';
import Basket from '../Basket/index';
import Like from '../Like/index.jsx';
import useHandleFavoriteClick from '../../../utils/handleFavoriteClick.jsx';
import useHandleBasketClick from '../../../utils/handleBasketClick.jsx';

export default function ProductCard({ product, ...otherProps }) {
	const handleFavoriteClick = useHandleFavoriteClick(product);
	const handleBasketClick = useHandleBasketClick(product);
	
	if (!product || !product.id) {
		return null;
	}

	const handleCardClick = e => {
		e.stopPropagation();
		// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
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
				{product.discont_price && (
					<div className={s.discount_size}>
						-{Math.round((1 - product.discont_price / product.price) * 100)}%
					</div>
				)}

				<div className={s.like_cart}>
					<Like product={product} onClick={handleFavoriteClick} />
					<Basket product={product} onClick={handleBasketClick} />
				</div>
			</div>

			<div className={s.product_description}>
				<h3>{product.title}</h3>

				<div className={s.price}>
					{product.discont_price ? (
						<>
							<h2>${product.discont_price.toFixed(2)}</h2>
							<h5>${product.price.toFixed(2)}</h5>
						</>
					) : (
						<h4>${product.price.toFixed(2)}</h4>
					)}
				</div>
			</div>
		</Link>
	);
}

