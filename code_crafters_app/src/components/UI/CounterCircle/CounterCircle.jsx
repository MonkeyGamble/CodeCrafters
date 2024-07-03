import React from 'react';
import s from './counterCircle.module.css';

export default function CounterCircle({ count }) {
	return <div className={s.circle_counter}>{count}</div>;
}
