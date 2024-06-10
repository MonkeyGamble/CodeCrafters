import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';

import DiscountUserForm from './DiscountUserForm';
import '../../../Global.css';
import CategoriesHomePage from './Categories/index';


export default function HomePage() {
	return (
		<main>
			<DiscountBanner />

			<DiscountProducts className={s.discount_products} />

            <CategoriesHomePage limit = {4}/>
			<DiscountUserForm />

		</div>

	);
}
