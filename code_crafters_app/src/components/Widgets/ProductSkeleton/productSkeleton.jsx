import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './ProductSkeleton.module.css';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
	return (
		<SkeletonTheme
			baseColor='var(--grey_divider)'
			highlightColor='var(--text_black)'
		>
			<div className={s.card}>
				<Skeleton height={284} className={s.product_picture} />

				<div className={s.product_description}>
					<h3>
						<Skeleton width={252} height={26} />
					</h3>
					<div className={s.price}>
						<Skeleton width={91} height={44} />
						<Skeleton width={51} height={26} />
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default ProductSkeleton;
