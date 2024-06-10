import DiscountBanner from './DiscountBanner';
import DiscountProducts from './DiscountProducts';
import s from './HomePage.module.css';
import DiscountUserForm from './DiscountUserForm';
import '../../../Global.css';
import CategoriesHomePage from './Categories/index';


export default function HomePage() {
	return (
		<div className={`${s.container} content_line`}>
			<DiscountBanner />
			<DiscountProducts className={s.discount_products} />

            <CategoriesHomePage limit = {4}/>
			<DiscountUserForm />

		</div>
	);
}
