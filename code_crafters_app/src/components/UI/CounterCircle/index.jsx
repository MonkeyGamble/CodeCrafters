import React from 'react';
import s from './CounterCircle.module.css';

export default function CounterCircle({ count, style }) {
	return <div className={s.circle_counter}>{count}</div>;
}
