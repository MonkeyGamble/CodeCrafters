import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/index';
import CategoriesPage from './pages/CategoriesPage/index';
import AllProductsPage from './pages/AllProductsPage/index';
import DiscountedItemsPage from './pages/DiscountedItemsPage/index';
import ProductsFromCategoryPage from './pages/CategoriesPage/ProductsFromCategoryPage/index';
import ProductItemPage from './pages/ProductItemPage/index';
import ShoppingCartPage from './pages/ShoppingCartPage/index';
import LikedProductsPage from './pages/LikedProductsPage/index';
import NotFoundPage from './pages/NotFoundPage/index';
import Layout from './Layout';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <HomePage /> },
			{ path: '/categories', element: <CategoriesPage /> },
			{ path: '/all_products', element: <AllProductsPage /> },
			{ path: '/all_sales', element: <DiscountedItemsPage /> },
			{ path: '/products', element: <ProductsFromCategoryPage /> },
			{ path: '/products/:id', element: <ProductItemPage /> },
			{ path: '/shopping_cart', element: <ShoppingCartPage /> },
			{ path: '/liked_products', element: <LikedProductsPage /> },
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
