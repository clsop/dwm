class Language {
	private translations: any;

	constructor() {
		// TODO: get json translations
	}

	public getTranslation(key: string): string {
		if (!(key in this.translations)) {
			// TODO: log key not found
		}

		return this.translations[key];
	}
}

export default new Language();