import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './AllProductsPage.module.css';
<<<<<<< HEAD
import { ROOT_URL } from '../../..';
import like from '../../../assets/img/like_white.png';
import { useDispatch } from 'react-redux';
import { addProductToBasketAction } from '../../../store/basketReducer';
import Basket from '../../Basket/index.jsx';
import ProductSkeleton from '../../ProductSkeleton/ProductSkeleton.js';

=======

import Filter from '../../Filter/index.jsx';
import { getAllProducts } from '../../../asyncActions/products.js';
import ProductCard from '../../ProductCard/index.jsx';
>>>>>>> origin/sprint4/diana

const AllProductsPage = () => {
	const dispatch = useDispatch();
	const filters = useSelector(state => state.products.filters);
	const filteredProducts = useSelector(
		state => state.products.filteredProducts
	);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className={`${s.sale_container} content_line`}>
			<div className={s.nav_buttons}>
				<Link to='/'>
					<button className={s.first_button}>Main page</button>
				</Link>
				<div className={s.nav_line}></div>
				<Link to='/all_products'>
					<button className={s.second_button}>All products</button>
				</Link>
			</div>

			<div className={s.header_section}>
				<h1>All Products</h1>
			</div>
			<Filter
				minPrice={filters.minPrice}
				maxPrice={filters.maxPrice}
				isDiscounted={filters.isDiscounted}
				sortOrder={filters.sortOrder}
			/>

			<div className={s.cards_container}>
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

<<<<<<< HEAD
    console.log('Filtered Products:', filtered);
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, isDiscounted, sortOrder, products]);
  const handleAddToFavorites = () => {
    // Добавьте функциональность для добавления в избранное
  };
 
  const handleAddToBasket = (product) => {
    // Вызов действия для добавления товара в корзину
    dispatch(addProductToBasketAction({ ...product, count: 1 }));
    console.log(`Товар добавлен в корзину: ${product.title}`);
  };
  
  return (
    <div className={`${s.sale_container} content_line`}>
      <div className={s.header_section}>
        <h1>All Products</h1>
      </div>
      <div className={`${s.filter_options} filter-options`}>
        <div className={`${s.filter_option} filter-option`}>
          <label>Price</label>
          <input 
            type="number" 
            placeholder="from" 
            value={minPrice} 
            onChange={e => setMinPrice(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="to" 
            value={maxPrice} 
            onChange={e => setMaxPrice(e.target.value)} 
          />
        </div>
        <div className={`${s.filter_option} filter-option`}>
          <label>Discounted items</label>
          <input 
            type="checkbox" 
            checked={isDiscounted} 
            onChange={e => setIsDiscounted(e.target.checked)} 
          />
        </div>
        <div className={`${s.filter_option} filter-option`}>
          <label>Sorted</label>
          <select 
            value={sortOrder} 
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="default">by default</option>
            <option value="priceAsc">price Asc</option>
            <option value="priceDesc">price Desc</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className={s.cards_container}>
      {loading ? (
          // Вывод скелетонов загрузки, пока данные загружаются
          Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          
      randomAllProducts.map(product => (
          <div key={product.id} className={s.card}>
            <div
              className={s.product_picture}
              style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
              
            >
              {product.discont_price && product.discont_price < product.price && (
                <div className={s.discount_size}>
                  -{Math.round((1 - product.discont_price / product.price) * 100)}%
                </div>
              )}
             <img 
                src={like} 
                alt='like' 
                className={s.like_icon} 
                onClick={handleAddToFavorites} 
              />
            </div>
            <div className={s.product_description}>
              <h3>{product.title}</h3>
              <div className={s.price}>
                {product.discont_price !== null ? (
                  <>
                    <h2 className={s.price_discounted}>${product.discont_price.toFixed(2)}</h2>
                    <h5>${product.price.toFixed(2)}</h5>
                  </>
                ) : (
                  <h2>${product.price.toFixed(2)}</h2>
                )}
              </div>
              <Basket 
                product={product} 
                onClick={() => handleAddToBasket(product)} 
                className={s.basket_icon} 
              />
            </div>
          </div>
        ))
    )}
      
      </div>
      
    </div>
  );
}



export default AllProductsPage;
=======
export default AllProductsPage;
>>>>>>> origin/sprint4/diana
