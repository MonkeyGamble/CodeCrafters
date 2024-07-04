import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/Global.css';

import { router } from './Router/Router';

export default function App() {
	return <RouterProvider router={router} />;
}
