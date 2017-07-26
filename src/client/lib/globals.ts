import Storage from './browser-storage';
import { StorageType } from './enums';

let globals: Lib.Globals = {
	isAuthenticated: () => {
		return Storage.getStorage(StorageType.Local)
			.get("token") !== null;
	}
};

export default globals;