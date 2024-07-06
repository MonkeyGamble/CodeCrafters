import s from './NotFoundPage.module.css';
import '../../../styles/Global.css';
import notFound from '../../../assets/img/not_found.png';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className={`${s.not_found_wrapper} content_line`}>
			<img src={notFound} alt='Page Not Found' />
			<div className={s.content}>
				<h1>Page Not Found</h1>
				<p>
					We’re sorry, the page you requested could not be found. Please go back
					to the homepage.
				</p>
				<Link to='/'>Go Home</Link>
			</div>
		</div>
	);
}
