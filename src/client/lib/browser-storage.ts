import { StorageType } from './enums';

import LocalStorage from './local-storage';

export default class BrowserStorage {
	public static getStorage(type: StorageType = StorageType.Local): BrowserStorage.IBrowserStorage {
		let storage = null;

		// TODO: responsibility chain for fallbacks

		switch(type) {
			case StorageType.Local: storage = new LocalStorage(); break;
			default: storage = new LocalStorage(); break;
		}

		return storage;
	}
}