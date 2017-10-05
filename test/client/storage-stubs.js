"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
global.localStorage = {
    getItem: function (key) { return undefined; },
    setItem: function (key, data) { },
    removeItem: function (key) { },
    clear: function () { }
};
global.sessionStorage = {
    getItem: function (key) { return undefined; },
    setItem: function (key, data) { },
    removeItem: function (key) { },
    clear: function () { }
};
exports.default = {
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
