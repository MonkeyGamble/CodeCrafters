import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';
import Categories from './Categories/index';
import DiscountUserForm from './DiscountUserForm';

export default function HomePage() {
	return (
		<div>
			<DiscountBanner />
			<DiscountProducts className={s.discount_products} />
            <Categories limit = {4}/>
			<DiscountUserForm />
		</div>
	);
}
