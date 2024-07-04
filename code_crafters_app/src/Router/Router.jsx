import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/pages/HomePage/index';
import AllProductsPage from '../components/pages/AllProductsPage/index';
import DiscountedItemsPage from '../components/pages/DiscountedItemsPage/index';
import AllCategoriesPage from '../components/pages/AllCategoriesPage/index';
import ProductsFromCategoryPage from '../components/pages/AllCategoriesPage/ProductsFromCategoryPage/index.jsx';
import ProductItemPage from '../components/pages/ProductItemPage/index';
import ShoppingCartPage from '../components/pages/ShoppingCartPage/index';
import FavoriteProductsPage from '../components/pages/FavoriteProductsPage/index';
import NotFoundPage from '../components/pages/NotFoundPage/index';
import Layout from './Layout.jsx';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <HomePage /> },
			{ path: '/all_products', element: <AllProductsPage /> },
			{ path: '/all_sales', element: <DiscountedItemsPage /> },
			{ path: '/categories/:id', element: <ProductsFromCategoryPage /> },
			{ path: '/products/:id', element: <ProductItemPage /> },
			{ path: '/shopping_cart', element: <ShoppingCartPage /> },
			{ path: '/liked_products', element: <FavoriteProductsPage /> },
			{ path: '/all_categories', element: <AllCategoriesPage /> },

			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
