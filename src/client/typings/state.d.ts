declare namespace State {
	export interface Login {
		login: string;
		passwd: string;
		hasError: boolean;
		errorText: string;
	}
}