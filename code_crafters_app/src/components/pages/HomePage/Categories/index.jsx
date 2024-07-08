import s from './Categories.module.css';
import Categories from '../../../Common/Categories';
import '../../../../styles/Global.css';

export default function CategoriesHomePage() {
	return (
		<div className='content_line'>
			<Categories limit={4} style={s} />
		</div>
	);
}
