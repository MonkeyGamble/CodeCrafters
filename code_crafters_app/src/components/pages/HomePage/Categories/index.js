import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Categories.module.css';
import { ROOT_URL } from '../../../../index';
import { getAllCategories } from '../../../../asyncActions/categories';


export default function Categories() {

 const dispatch = useDispatch()
 
 useEffect(() => {
  dispatch(getAllCategories());
}, [dispatch]);


const categories = useSelector( state => state.categories.allCategories);
console.log ( categories)
  return (
    <section className={s.categories}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Categories</h2>
		  <span className={s.line}></span>
	      <button className={s.my_button}>All categories</button>
         
        </div>
        <div className={s.categoryList}>
          {categories.slice(0,4).map((category) => (
            <div key={category.id} className={s.categoryItem}>
              <img src={ROOT_URL+category.image} alt={category.title} className={s.categoryImage} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


