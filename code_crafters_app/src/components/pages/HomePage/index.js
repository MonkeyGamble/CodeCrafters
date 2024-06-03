import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';
import '../../../Global.css';

export default function HomePage() {
	return (
		<div className={`${s.container} content_line`}>
			<DiscountBanner />
			<DiscountProducts className={s.discount_products} />
		</div>
	);
}
