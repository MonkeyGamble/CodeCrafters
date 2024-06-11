import s from './Counter.module.css';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';

export default function Counter() {
	return (
		<div className={s.counter_wrapper}>
			<button className={s.counter_button_decr}>
				<FaMinus className={s.decr} />
			</button>
			<span className={s.counter_number}>1</span>
			<button className={s.counter_button_incr}>
				<FaPlus className={s.incr} />
			</button>
		</div>
	);
}
