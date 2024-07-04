import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import s from './ProductSkeleton.module.css'; 

const ProductSkeleton = () => {
  return (
    <div className={s.card}>
      <div className={s.product_picture}>
        <Skeleton height={200} /> 
      </div>
      <div className={s.product_description}>
        <h3><Skeleton width={200} /></h3> 
        <div className={s.price}>
          <Skeleton width={100} /> 
          <Skeleton width={100} /> 
        </div>
      </div>
    </div>
  );
};


export default ProductSkeleton;