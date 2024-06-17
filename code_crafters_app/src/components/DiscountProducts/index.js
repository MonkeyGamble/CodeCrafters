import '../../Global.css';

import { Link } from 'react-router-dom';
// import { ROOT_URL } from '../../index';
// import Basket from '../Basket';
import ProductCard from '../ProductCard';

export default function DiscountProducts({ products, header, styles, filter }) {
	// const handleCardClick = e => {
	// 	// Если кликнули на карточку продукта внутри Link, предотвращаем всплытие события
	// 	e.stopPropagation();
	// };

	return (
		<div className={`${styles.sale_container} content_line`}>
			<div className={styles.component_header}>
				<h1>{header}</h1>

				<div className={styles.line}></div>

				<Link to='/all_sales'>
					<button>All sales</button>
				</Link>
			</div>

			{filter && filter}

			<div className={styles.cards_container}>
				{products.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						// handleCardClick={handleCardClick} // Обработчик клика на карточку
						// styles={styles} // Передаем стили в ProductCard
						// ROOT_URL={ROOT_URL} // Передаем ROOT_URL в ProductCard
					/>
				))}
			</div>

			<button className={styles.button_340}>All sales</button>
		</div>
	);
}
