import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render(): React.ReactElement<any> {
		return <div>
			<p>Home</p>
			<Link to="/login">Login</Link>
		</div>;
	}
}