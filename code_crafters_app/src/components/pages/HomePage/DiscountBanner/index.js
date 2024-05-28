import s from './DiscountBanner.module.css';
import { Link } from 'react-router-dom';

export default function DiscountBanner() {
	return (
		<div className={s.discount_banner}>
			<h1>Amazing Discounts on Garden Products!</h1>
			<Link to='/shopping_cart'>
				<button>Check out</button>
			</Link>
		</div>
	);
}
