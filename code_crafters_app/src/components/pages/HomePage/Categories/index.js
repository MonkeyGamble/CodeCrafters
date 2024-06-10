import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Categories.module.css';
import { getAllCategories } from '../../../../asyncActions/categories';
import Categories from '../../../Categories';

export default function CategoriesHomePage({limit}) {

 const dispatch = useDispatch();
 const categories = useSelector( state => state.categories.allCategories);

 
 useEffect(() => {
  dispatch(getAllCategories());
}, [dispatch]);


console.log (categories)
  return (
    <Categories limit={4} style={s}/>
  );
}


