import React from 'react';
import s from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
	return (
		<footer>
			<div className={`${s.footerContainer} content_line`}>
				<h1>Contact</h1>
				<div className={s.contactInfo}>
					<div className={s.infoBox}>
						<p className={s.label}>Phone</p>
						<p className={s.content}>+49 999 999 99 99</p>
					</div>
					<div className={s.infoBox}>
						<p className={s.label}>Socials</p>
						<div className={s.socialLinks}>
							<a href='https://facebook.com'>
								<FontAwesomeIcon icon={faFacebook} />
							</a>
							<a href='https://twitter.com'>
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a href='https://instagram.com'>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
						</div>
					</div>
					<div className={s.infoBox}>
						<p className={s.label}>Address</p>
						<p className={s.content}>
							Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
						</p>
					</div>
					<div className={s.infoBox}>
						<p className={s.label}>Working Hours</p>
						<p className={s.content}>24 hours a day</p>
					</div>
				</div>

				<iframe
					className={s.map}
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409042779777!2d13.372469775645381!3d52.507936137123856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sde!4v1717373898382!5m2!1suk!2sde'
					width='600'
					height='450'
					style={{ border: 0 }}
					allowFullScreen=''
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				></iframe>
			</div>
		</footer>
	);
}