import * as sinon from 'sinon';

global.localStorage = {
	getItem: (key) => undefined,
	setItem: (key, data) => {},
	removeItem: (key) => {},
	clear: () => {}
};
global.sessionStorage = {
	getItem: (key) => undefined,
	setItem: (key, data) => {},
	removeItem: (key) => {},
	clear: () => {}
};

export default {
	localStorage: {
		getItem: sinon.stub(global.localStorage, "getItem"),
		setItem: sinon.stub(global.localStorage, "setItem"),
		removeItem: sinon.stub(global.localStorage, "removeItem"),
		clear: sinon.stub(global.localStorage, "clear")
	},
	sessionStorage: {
		getItem: sinon.stub(global.sessionStorage, "getItem"),
		setItem: sinon.stub(global.sessionStorage, "setItem"),
		removeItem: sinon.stub(global.sessionStorage, "removeItem"),
		clear: sinon.stub(global.sessionStorage, "clear")
	}
};