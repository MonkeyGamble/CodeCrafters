import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';
import Categories from './Categories/index';
import DiscountUserForm from './DiscountUserForm';
import '../../../Global.css';

export default function HomePage() {
	return (
		<main>
			<DiscountBanner />
			<div className={`${s.container} content_line`}>
				<Categories limit={4} />
				<DiscountUserForm />
				<DiscountProducts className={s.discount_products} />
			</div>
		</main>
	);
}
