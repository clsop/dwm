import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render(
	<Router forceRefresh={!supportsHistory}>
		<App></App>
	</Router>,
	document.getElementById('app-root')
);