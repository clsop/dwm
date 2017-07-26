import { StorageType } from './enums';

import LocalStorage from './local-storage';

export default class BrowserStorage {
	public static getStorage(type: StorageType): BrowserStorage.IBrowserStorage {
		let storage = null;

		switch(type) {
			case StorageType.Local: storage = new LocalStorage(); break;
			default: storage = new LocalStorage(); break; // TODO: should be cookie storage
		}

		return storage;
	}
}