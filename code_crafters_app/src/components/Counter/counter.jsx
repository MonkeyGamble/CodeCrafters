import { useSelector, useDispatch } from 'react-redux';
import s from './Counter.module.css';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import {
	incrementProductCount,
	decrementProductCount,
} from '../../asyncActions/products.js';

export default function Counter() {
	const product = useSelector(state => state.products.product);
	const dispatch = useDispatch();

	const count = product?.count ?? 0;

	const increment = () => {
		dispatch(incrementProductCount());
	};

	const decrement = () => {
		dispatch(decrementProductCount());
	};

	return (
		<div className={s.counter_wrapper}>
			<button className={s.counter_button_decr} onClick={decrement}>
				<FaMinus className={s.decr} />
			</button>
			<span className={s.counter_number}>{count}</span>
			<button className={s.counter_button_incr} onClick={increment}>
				<FaPlus className={s.incr} />
			</button>
		</div>
	);
}
