import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';
import cs from './Categories/Categories.module.css';
import Categories from './Categories';
import DiscountUserForm from './DiscountUserForm';
import '../../../styles/Global.css';

export default function HomePage() {
	return (
		<main>
			<DiscountBanner />
			<Categories limit={4} style={cs} />
			<DiscountUserForm />
			<DiscountProducts className={s.discount_products} />
		</main>
	);
}
