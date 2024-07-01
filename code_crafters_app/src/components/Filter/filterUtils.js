export const filterProducts = (products, filters) => {
	let filtered = products.filter(product => {
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

	const { sortOrder } = filters;

	if (sortOrder === 'priceAsc') {
		filtered = filtered.sort((a, b) => {
			const priceA = a.discont_price !== null ? a.discont_price : a.price;
			const priceB = b.discont_price !== null ? b.discont_price : b.price;
			return priceA - priceB;
		});
	} else if (sortOrder === 'priceDesc') {
		filtered = filtered.sort((a, b) => {
			const priceA = a.discont_price !== null ? a.discont_price : a.price;
			const priceB = b.discont_price !== null ? b.discont_price : b.price;
			return priceB - priceA;
		});
	} else if (sortOrder === 'alphabetical') {
		filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
	}

	return filtered;
};
