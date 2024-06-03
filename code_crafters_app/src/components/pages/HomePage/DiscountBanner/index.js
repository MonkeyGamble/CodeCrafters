import s from './DiscountBanner.module.css';
import '../../../../Global.css';
import { Link } from 'react-router-dom';

export default function DiscountBanner() {
	return (
		<div className={`${s.discount_banner} content_line`}>
			<h1>Amazing Discounts on Garden Products!</h1>
			<Link to='/all_sales'>
				<button>Check out</button>
			</Link>
		</div>
	);
}
