import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Импортируем стили Skeleton
import s from './ProductSkeleton.module.css'; // Импортируем CSS для компонента

const ProductSkeleton = () => {
  return (
    <div className={s.card}>
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
  );
};


export default ProductSkeleton;