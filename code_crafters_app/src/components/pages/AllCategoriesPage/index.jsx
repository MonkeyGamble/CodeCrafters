import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './AllCategoriesPage.module.css';
import { ROOT_URL } from '../../../../src/index';
import { getAllCategories } from '../../../asyncActions/categories';
import { NavLink } from 'react-router-dom';
import like from '../../../assets/img/like_white.png';
import shopping_cart from '../../../assets/img/shopping_cart_white.png';

export default function AllCategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.allCategories);

  useEffect(() => {
      dispatch(getAllCategories());
  }, [dispatch]);

  function shuffle(array) {
    let currentIndex = array.length,
        tempElem,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempElem = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempElem;
    }
    return array;
  }

  const randomCategories = shuffle(categories).slice(0, 4);

  return (
      <section className={s.categories}>
          <div className={s.wrapper}>
            <NavLink to="/">
               <button className={s.mainPageButton}>Main page</button>
            </NavLink> 
            <NavLink to="/categories">
               <button className={s.categoriesButton}>Categories</button>
            </NavLink>
            <button className={s.all_categories_button1}>Tools and equipment</button>
          </div>
          <div className={s.header}>
              <h2>Tools and equipment</h2>
          </div>
          <div className={s.categoryList}>
              {randomCategories.map(category => (
                  <div key={category.id} className={s.categoryItem}>
                      <img src={`${ROOT_URL}${category.image}`} alt={category.title} className={s.categoryImage} />
                      <p>{category.title}</p>
                  </div>
              ))}
          </div>
      </section>
  );
}


/*import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './AllCategoriesPage.module.css';
import { ROOT_URL } from '../../../../src/index';
import { getAllCategories } from '../../../asyncActions/categories';
import { NavLink } from 'react-router-dom';


export default function AllCategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.allCategories);

  useEffect(() => {
      dispatch(getAllCategories());
  }, [dispatch]);

  return (
      <section className={s.categories}>
          <div className={s.wrapper}>
            <NavLink to="/">
               <button className={s.mainPageButton}>Main page</button>
            </NavLink> 
            <NavLink to="/categories" >
               <button className={s.categoriesButton}>Categories</button>
            </NavLink>
            <button className={s.all_categories_button1}>Tools and equipment</button>
          </div>
          <div className={s.header}>
                  <h2>Tools and equipment</h2>
              </div>
              <div className={s.categoryList}>
                  {categories.map(category => (
                      <div key={category.id} className={s.categoryItem}>
                          <img src={`${ROOT_URL}${category.image}`} alt={category.title} className={s.categoryImage} />
                          <p>{category.title}</p>
                      </div>
                  ))}
              </div>
          
      </section>
  );
} */