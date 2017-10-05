"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
global.location = {
    origin: 'http://localhost'
};
global.navigation = {};
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
exports.default = {
    location: {},
    navigation: {},
    XMLHttpRequest: global.XMLHttpRequest
};
