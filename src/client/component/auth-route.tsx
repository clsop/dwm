import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Globals from '../lib/globals';

const route = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		Globals.isAuthenticated() ? (
			<Component {...props} />
		) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}} />
		)
	)} />
);

export default route;