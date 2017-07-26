declare namespace Service {
	export interface Settings {
		name: string;
		baseUrl?: string;
		headers?: Object;
	}

	export interface Request {
		body?: any;
		responseType?: string;
		async?: boolean;
		headers?: Object;
		timeout?: number;
		hasContent?: boolean;
		withCredentials?: boolean;
		user?: string;
		password?: string;
	}
}