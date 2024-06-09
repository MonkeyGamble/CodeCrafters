import s from './Filter.module.css';

export default function Filter() {
	return (
		<section className={s.filter}>
    
			<div className={s.filter_price}>
				<p>Price</p>
				<input type='text' placeholder='from' />
				<input type='text' placeholder='to' />
			</div>

			<div className={s.filter_sort}>
				<label for='filter_sort'>Sorted</label>
				<select id='filter_sort' name='options'>
					<option value='option1'>by default</option>
					<option value='option2'>Price from Low to High</option>
					<option value='option3'>Price for High to Low</option>
				</select>
			</div>
		</section>
	);
}
