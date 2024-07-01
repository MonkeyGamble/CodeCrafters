import { useParams } from 'react-router-dom';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { getProductsByCategoryId } from '../../../../asyncActions/products';
import { ROOT_URL } from '../../../..';
import '../../../../Global.css';
import { Link } from 'react-router-dom';
import like from '../../../../assets/img/like_white.png';
//import shopping_cart from '../../../../assets/img/shopping_cart_white.png';
import Basket from '../../../Basket';
import ProductSkeleton from '../../../ProductSkeleton/ProductSkeleton';

export default function ProductsFromCategoryPage() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const productsByCategory = useSelector(
		store => store.products.productsFromCategory
		
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getProductsByCategoryId(id))
		.then(() => setLoading(false)) // После загрузки данных устанавливаем loading в false
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false); // В случае ошибки также устанавливаем loading в false
            });
	}, [dispatch, id]);

	if (loading) {
        // Пока данные загружаются, отображаем скелетон загрузки
        return (
            <div className={`${s.products_wrapper} content_line`}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        );
    }
	return (
		<div className={`${s.products_wrapper} content_line`}>
			{productsByCategory.category && productsByCategory.data && (
				<>
					<div className={s.nav_buttons}>
						<Link to='/'>
							<button className={s.main_button}>Main page</button>
						</Link>
						<div className={s.nav_line}></div>
						<Link to='/all_categories'>
							<button className={s.section_button}>Categories</button>
						</Link>
						<div className={s.nav_line}></div>
						<button className={s.section_name_button}>
							{productsByCategory.category.title}
						</button>
					</div>

					<div className={s.cards_container}>
						{productsByCategory.data.map(product => (
							<Link
								key={product.id}
								to={`/products/${product.id}`}
								className={s.card}
							>
								<div
									className={s.product_picture}
									style={{
										backgroundImage: `url(${ROOT_URL + product.image})`,
									}}
								>
									{product.discont_price !== null && (
										<div className={s.discount_size}>
											-
											{Math.round(
												(1 - product.discont_price / product.price) * 100
											)}
											%
										</div>
									)}
									<div className={s.like_cart}>
										<img src={like} alt='like' />
										<Basket product={product} />
										{/* <img src={shopping_cart} alt='cart' /> */}
									</div>
								</div>

								<div className={s.product_description}>
									<h3>{product.title}</h3>
									<div className={s.price}>
										<h2>${product.price}</h2>
										{product.discont_price !== null && (
											<h5>${product.discont_price}</h5>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}
