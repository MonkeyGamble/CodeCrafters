
export default function ProductsFromCategoryPage() {
	return <div>ProductsFromCategoryPage</div>;
}

/*useParams()



import { useParams } from 'react-router-dom';
import s from './ProductsFromCategoryPage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


export default function ProductsFromCategoryPage() {
	const { categories_name } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStatusAction());
    dispatch(getProductsFromCategoryPage(categories_name))
  }, []);

  const productsByCategoryState = useSelector(store => store.productsByCategory);

  const { status, data } = productsByCategoryState;

  return (
    <div>
      {
        status === 'loading'
        ? <p>Loading...</p>
        : <div className={s.container}>
            {
              data.map(el => <ProductCard key={el.id} {...el} />)
            }
          </div>
      }
    </div> 
  )
}
*/