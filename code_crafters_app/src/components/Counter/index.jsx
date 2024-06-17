import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Counter.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import {
	incrementProductCountAction,
	decrementProductCountAction,
} from '../../store/productsReducer';

export default function Counter({ count, onIncrement, onDecrement }) {
	// const product = useSelector(state => state.products.product);
	// const dispatch = useDispatch();

	// const count = product?.count ?? 1; // Используем значение по умолчанию 1, если product.count не определен

	// const increment = () => {
	// 	dispatch(incrementProductCountAction());
	// };

	// const decrement = () => {
	// 	dispatch(decrementProductCountAction());
	// };

	return (
		<div className={s.counter_wrapper}>
			<button className={s.counter_button_decr} onClick={onDecrement}>
				<FaMinus className={s.decr} />
			</button>
			<span className={s.counter_number}>{count}</span>
			<button className={s.counter_button_incr} onClick={onIncrement}>
				<FaPlus className={s.incr} />
			</button>
		</div>
	);
}

// return (
// 	<div className={s.counter_wrapper}>
// 		<button className={s.counter_button_decr} onClick={decrement}>
// 			<FaMinus className={s.decr} />
// 		</button>
// 		<span className={s.counter_number}>{count}</span>
// 		<button className={s.counter_button_incr} onClick={increment}>
// 			<FaPlus className={s.incr} />
// 		</button>
// 	</div>
// );
