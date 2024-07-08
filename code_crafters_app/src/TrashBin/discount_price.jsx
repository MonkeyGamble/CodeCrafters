const discount_size = product => {
	const size = Math.round((1 - product.discont_price / product.price) * 100);
	return size;
};
export default discount_size;
