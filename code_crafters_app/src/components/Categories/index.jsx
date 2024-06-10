import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROOT_URL } from '../../index';
import { getAllCategories } from '../../asyncActions/categories';
import { NavLink } from 'react-router-dom';


export default function Categories({limit, style}) {

 const dispatch = useDispatch();
 const categories = useSelector( state => state.categories.allCategories);

 
 useEffect(() => {
  dispatch(getAllCategories());
}, [dispatch]);


console.log (categories)
  return (
    <section className={style.categories}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2>Categories</h2>
		  <span className={style.line}></span>
      <NavLink to="/all_categories">
	      <button className={style.my_button}>All categories</button>
        
      </NavLink>   
        </div>
        <div className={style.categoryList}>
          {categories.slice(0,limit).map((category) => (
            <div key={category.id} className={style.categoryItem}>
              <img src={ROOT_URL+category.image} alt={category.title} className={style.categoryImage} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


