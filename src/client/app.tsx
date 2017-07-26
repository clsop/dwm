import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import AuthRoute from './component/auth-route';
import Routes from './routes';

import Home from './page/home';
import Login from './page/login';

export default class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render(): React.ReactElement<any> {
		return <div id="app-context">
			<Routes>
				<AuthRoute path="/" exact={true} component={Home} />
				<Route path="/login" exact={true} component={Login} />
			</Routes>
		</div>;
	}
}