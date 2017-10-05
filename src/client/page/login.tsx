import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AjaxError } from 'rxjs/Rx';

import BrowserStorage from '../lib/browser-storage';
import { StorageType } from '../lib/enums';
import Service from '../service/service';

enum LoginStatus {
	NoServer = 0,
	LoginNotFound = 100,
	WrongLoginOrPass = 200,
	MissingLogin = 300,
	MissingPass = 400,
	AlreadyLoggedIn = 500
}

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
			passwd: '',
			hasError: false,
			errorText: ''
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
			if (reason.status > 0) {
				let response: Models.LoginError = JSON.parse(reason.xhr.response);

				// already logged in
				if (response.LoginCode === 500) {
					this.props.history.push(this.props.location.state ? this.props.location.state.from : '/');
				} else {
					this.setError(response.Message);
				}
			} else {
				this.setError('Could not contact server!');
			}
		});
	}

	private setError(text: string): void {
		this.setState({
			hasError: true,
			errorText: text
		});
	}

	protected inputChange(event: any): void {
		this.setState({
			[event.nativeEvent.target.name]: event.nativeEvent.target.value
		});
	}

	public render(): React.ReactElement<any> {
		return <div className="middle aligned center">
			<div className="column">
				<h2 className="ui teal header">Drive With Me</h2>
				<form className="ui large form">
					<div className="ui stacked segment">
						<div className="field">
							<div className="ui left icon input">
								<i className="user icon"></i>
								<input type="text" id="login" name="login" placeholder="User"
					 					value={this.state.login} onChange={this.inputChange} />
							</div>
						</div>
						<div className="field">
							<div className="ui left icon input">
								<i className="lock icon"></i>
								<input type="password" id="passwd" name="passwd" placeholder="Password"
					 					value={this.state.passwd} onChange={this.inputChange} />
							</div>
						</div>
						<div className="ui fluid large teal submit button">Login</div>
					</div>
					<div className="ui error message"></div>
				</form>
				<div className="ui message"></div>
			</div>
		</div>;
	}
}