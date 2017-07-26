import { Observable } from 'rxjs/Observable';
import { AjaxRequest, AjaxResponse } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export default class BaseService<T> {
	private Request: AjaxRequest;

	constructor(settings: Service.Settings) {
		this.Request = {
			url: `${settings.baseUrl || location.origin}/${settings.name}`,
			async: true,
			headers: settings.headers,
			hasContent: false,
			crossDomain: false, // location.origin != settings.baseUrl, // TODO: regex for domain from url
			responseType: 'json'
		};
	}

	protected setRequest(request: Service.Request): void {
		if (request.user || request.password) {
			request.withCredentials = true;
		}

		if (request.body) {
			request.hasContent = true;
		}
	}

	public get(request?: Service.Request): Observable<T> {
		let req = Object.assign(this.Request, { method: 'GET' });
		this.setRequest(req);
		
		return Observable.ajax(Object.assign(req, request))
			.map<AjaxResponse, T>((ar, i) => ar.response);
	}

	public post(request?: Service.Request): Observable<T> {
		let req = Object.assign(this.Request, { method: 'POST' });
		this.setRequest(req);
		
		return Observable.ajax(Object.assign(req, request))
			.map<AjaxResponse, T>((ar, i) => ar.response);
	}
}