import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AjaxError } from 'rxjs/Rx';

import BrowserStorage from '../lib/browser-storage';
import { StorageType } from '../lib/enums';
import Service from '../service/service';

export default class Login extends React.Component<RouteComponentProps<any>, State.Login> {
	private Storage: BrowserStorage.IBrowserStorage;
	private Service: Service<string>;

	constructor(props: RouteComponentProps<any>) {
		super(props);

		this.Storage = BrowserStorage.getStorage(StorageType.Local);
		let token = this.Storage.get("token");

		this.Service = new Service<string>({
			name: 'login',
			baseUrl: 'http://localhost:5000', // only in dev server
			headers: token !== null ? {
				Authorization: `Bearer ${token}`
			} : null
		});

		this.state = {
			login: '',
			passwd: ''
		};

		this.authenticate = this.authenticate.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}

	private authenticate(event: React.FormEvent<any>): void {
		event.preventDefault();
		
		this.Service.post({
			responseType: 'plain',
			body: `login=${this.state.login}&passwd=${this.state.passwd}`
		}).toPromise().then((token: string) => {
			this.Storage.set("token", token);

			// route to origin
			this.props.history.push(this.props.location.state.from);
		}).catch((reason: AjaxError) => {
			console.error(reason);
		});
	}

	protected inputChange(event: any): void {
		this.setState({
			[event.nativeEvent.target.name]: event.nativeEvent.target.value
		});
	}

	public render(): React.ReactElement<any> {
		return <div className="row">
			<div className="sixteen columns middle">
				<div className="offset-by-four four columns">
					<div id="login-form">
						<div className="row">
							<div className="offset-by-three eight columns">
								<h3>Drive With Me</h3>
							</div>
						</div>
						<form method="post" action="http://localhost:5000/login" onSubmit={this.authenticate}>
							<div className="row">
								<div className="four columns">
									<label htmlFor="user" className="horizontal-align"><strong>User:</strong></label>
								</div>
								<div className="eight columns">
									<input type="text" id="login" name="login" className="u-full-width"
										value={this.state.login} onChange={this.inputChange} />
								</div>
							</div>
							<div className="row">
								<div className="four columns">
									<label htmlFor="passwd" className="horizontal-align"><strong>Password:</strong></label>
								</div>
								<div className="eight columns">
									<input type="password" id="passwd" name="passwd" className="u-full-width"
										value={this.state.passwd} onChange={this.inputChange} />
								</div>
							</div>
							<div className="row">
								<div className="twelve columns">
									<button type="submit" className="u-pull-right button-primary">Login</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>;
	}
}