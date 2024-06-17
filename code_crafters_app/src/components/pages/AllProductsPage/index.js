import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './AllProductsPage.module.css';

const ROOT_URL = 'http://localhost:3333';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [randomAllProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    axios.get(`${ROOT_URL}/products/all`)
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;
    if (minPrice !== '') filtered = filtered.filter(p => (p.discont_price !== null ? p.discont_price : p.price) >= parseFloat(minPrice));
    if (maxPrice !== '') filtered = filtered.filter(p => (p.discont_price !== null ? p.discont_price : p.price) <= parseFloat(maxPrice));
    if (isDiscounted) filtered = filtered.filter(p => p.discont_price !== null && p.discont_price < p.price);

    switch (sortOrder) {
      case 'priceAsc':
        filtered = filtered.sort((a, b) => (a.discont_price !== null ? a.discont_price : a.price) - (b.discont_price !== null ? b.discont_price : b.price));
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => (b.discont_price !== null ? b.discont_price : b.price) - (a.discont_price !== null ? a.discont_price : a.price));
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts([...filtered]);
  }, [minPrice, maxPrice, isDiscounted, sortOrder, products]);

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
        {randomAllProducts.map(product => (
          <div key={product.id} className={s.card}>
            <div
              className={s.product_picture}
              style={{ backgroundImage: `url(${ROOT_URL + product.image})` }}
            >
              <div className={s.discount_size}>
                -{product.discont_price ? Math.round((1 - product.discont_price / product.price) * 100) : 0}%
              </div>
            </div>
            <div className={s.product_description}>
              <h3>{product.title}</h3>
              <div className={s.price}>
                {product.discont_price !== null ? (
                  <>
                    <h2>${product.discont_price.toFixed(2)}</h2>
                    <h5>${product.price.toFixed(2)}</h5>
                  </>
                ) : (
                  <h2>${product.price.toFixed(2)}</h2>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProductsPage;