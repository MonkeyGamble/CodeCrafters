import React from 'react';
import s from './Counter.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa6';

export default function Counter({ count, onIncrement, onDecrement }) {
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
