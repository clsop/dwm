import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import PageTransition from 'react-router-page-transition';
import { CSSTransition } from 'react-transition-group';

export default class Routes extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render(): React.ReactElement<any> {
		return <Route path="/" render={(props: Readonly<RouteComponentProps<any>>) => {
				return <CSSTransition classNames="fade" timeout={500}>
					<div className="route-context">
						{this.props.children}
					</div>
				</CSSTransition>
			}} />
	}
}