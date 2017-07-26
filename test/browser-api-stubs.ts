import * as sinon from 'sinon';

global.location = {
	origin: 'http://localhost'
};

global.navigation = {
	
};

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

export default {
	location: {
	},
	navigation: {
	},
	XMLHttpRequest: global.XMLHttpRequest
};