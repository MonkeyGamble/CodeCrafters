import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './AllProductsPage.module.css';
import { ROOT_URL } from '../../..';
import like from '../../../assets/img/like_white.png';
import { useDispatch } from 'react-redux';
import { addProductToBasketAction } from '../../../store/basketReducer';
import Basket from '../../Basket/index.jsx';
import Skeleton from 'react-loading-skeleton';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [randomAllProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
 
  

  useEffect(() => {
    axios.get(`${ROOT_URL}products/all`)
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (minPrice !== '') {
      filtered = filtered.filter(p => (p.discont_price !== null ? p.discont_price : p.price) >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(p => (p.discont_price !== null ? p.discont_price : p.price) <= parseFloat(maxPrice));
    }
    if (isDiscounted) {
      filtered = filtered.filter(p => p.discont_price !== null && p.discont_price < p.price);
    }

    switch (sortOrder) {
      case 'priceAsc':
        filtered.sort((a, b) => (a.discont_price !== null ? a.discont_price : a.price) - (b.discont_price !== null ? b.discont_price : b.price));
        break;
      case 'priceDesc':
        filtered.sort((a, b) => (b.discont_price !== null ? b.discont_price : b.price) - (a.discont_price !== null ? a.discont_price : a.price));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

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
            <div key={index} className={s.card}>
              <div className={s.product_picture}>
                <Skeleton height={200} /> {/* Пример высоты для изображения */}
              </div>
              <div className={s.product_description}>
                <h3><Skeleton width={200} /></h3> {/* Пример ширины для заголовка */}
                <div className={s.price}>
                  <Skeleton width={100} /> {/* Пример ширины для цены */}
                  <Skeleton width={100} /> {/* Пример ширины для скидочной цены */}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Отображение реальных данных, когда они загружены
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
      )
      }
      </div>
      
    </div>
  );
}



export default AllProductsPage;