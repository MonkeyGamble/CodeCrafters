import s from './Categories.module.css';
import Categories from '../../../Categories';

export default function CategoriesHomePage({ limit }) {
	return <Categories limit={4} style={s} />;
}
