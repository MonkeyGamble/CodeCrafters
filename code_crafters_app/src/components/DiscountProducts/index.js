import '../../Global.css';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

export default function DiscountProducts({ products, header, styles, filter }) {
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
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<button className={styles.button_340}>All sales</button>
		</div>
	);
}
