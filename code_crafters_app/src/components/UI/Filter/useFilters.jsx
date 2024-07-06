import { useState } from 'react';

export const useFilters = initialFilters => {
	const [filters, setFilters] = useState(initialFilters);

	const handleFilterChange = (key, value) => {
		setFilters(prevFilters => ({
			...prevFilters,
			[key]: value,
		}));
	};

	return [filters, handleFilterChange];
};
