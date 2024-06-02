import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';

export default function HomePage() {
	return (
		<div className={s.container}>
			<DiscountBanner />
			<DiscountProducts className={s.discount_products} />
		</div>
	);
}
