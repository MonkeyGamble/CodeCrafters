import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header/index';
import Footer from '../components/Layout/Footer/index';

const Layout = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
