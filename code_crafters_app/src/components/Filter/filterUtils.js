export const filterProducts = (products, filters) => {
	return products.filter(product => {
		let isMatch = true;

		if (filters.minPrice) {
			const minPrice = parseFloat(filters.minPrice);
			isMatch =
				isMatch &&
				(product.discont_price
					? product.discont_price >= minPrice
					: product.price >= minPrice);
		}

		if (filters.maxPrice) {
			const maxPrice = parseFloat(filters.maxPrice);
			isMatch =
				isMatch &&
				(product.discont_price
					? product.discont_price <= maxPrice
					: product.price <= maxPrice);
		}

		if (filters.isDiscounted) {
			isMatch = isMatch && product.discont_price !== null;
		}

		return isMatch;
	});
};
