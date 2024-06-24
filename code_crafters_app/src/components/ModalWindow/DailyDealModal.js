import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DailyDealModal.css';

const ROOT_URL = 'http://localhost:3333';

const DailyDealModal = ({ isOpen, onRequestClose, product }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !product) {
      setLoading(true);
      axios.get(`${ROOT_URL}/products/all`)
        .then(response => {
          const products = response.data;
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          setCurrentProduct(randomProduct);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, [isOpen, product]);

  if (!isOpen || (loading && !product)) return null;

  const displayedProduct = product || currentProduct;

  const price = displayedProduct.price !== undefined ? displayedProduct.price.toFixed(2) : '';
  const discountPrice = calculateDiscountPrice(price);

  const handleAddToCart = () => {
    console.log(`Added ${displayedProduct.title} to cart for $${discountPrice}`);
    onRequestClose();
  };

  const handleModalClick = (e) => {
    if (e.target.className === 'modal') {
      onRequestClose();
    }
  };

  return (
    <div className="modal" onClick={handleModalClick}>
      <div className="modalContent">
        <span className="close" onClick={onRequestClose}>&times;</span>
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <>
            <div className="modalHeader">
              <h2>50% discount on product of the day!</h2>
            </div>
            <div className="productDetails">
              <div className="discountBadge">-50%</div>
              <div className="product_picture" style={{ backgroundImage: `url(${ROOT_URL + displayedProduct.image})` }} />
              <h2>{displayedProduct.title}</h2>
              <div className="priceWrapper">
                <h3 className="discountPrice">${discountPrice}</h3>
                <h5 className="originalPrice">${price}</h5>
              </div>
              </div>
            
            <div className="addToCartWrapper">
              <button className="addToCart" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

// Функция для вычисления цены после скидки
const calculateDiscountPrice = (price) => {
  if (price === '') return '';

  const originalPrice = parseFloat(price);
  const discountedPrice = (originalPrice * 0.5).toFixed(2); // 50% скидка

  return discountedPrice;
};

export default DailyDealModal;