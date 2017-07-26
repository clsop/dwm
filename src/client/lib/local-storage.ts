export default class LocalStorage implements BrowserStorage.IBrowserStorage {
	private readonly storage: Storage;

	constructor() {
		this.storage = localStorage;
	}

	public set(key: string, data: string): void {
		this.storage.setItem(key, data);
	}

	public get(key: string): string {
		return this.storage.getItem(key);
	}

	public remove(key: string): void {
		this.storage.removeItem(key);
	}

	public clear(): void {
		this.storage.clear();
	}
}