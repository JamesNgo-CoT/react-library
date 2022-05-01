import React from 'react';
import ReactDomClient from 'react-dom/client';

import App from '../src/index';

ReactDomClient
	.createRoot(document.getElementById('app'))
	.render(<App>Hello World</App>);
