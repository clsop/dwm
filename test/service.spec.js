"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var service_1 = require("../src/client/service/service");
var browser_api_stubs_1 = require("./browser-api-stubs");
mocha_1.describe('Service', function () {
    mocha_1.describe('Base service', function () {
        var requests = [];
        browser_api_stubs_1.default.XMLHttpRequest.onCreate = function (xhr) {
            requests.push(xhr);
        };
        var instance = new service_1.default({ name: 'test', baseUrl: 'http://somewhereelse', headers: {
                Authorization: 'Bearer hereisatoken'
            } });
        mocha_1.beforeEach(function () {
            requests = [];
        });
        mocha_1.it('can do a get request with JSON response', function (done) {
            // act
            instance.get().subscribe(function (value) {
                //assert
                value.should.have.length(2);
            }, function (error) { }, function () {
                done();
            });
            requests[0].respond(202, { "Content-Type": "application/json" }, JSON.stringify([{ id: 10, name: "test" }, { id: 12, name: "test2" }]));
        });
        mocha_1.it('can do a get request with plain text response', function (done) {
            // act
            instance.get({ responseType: 'text' }).subscribe(function (token) {
                //assert
                token.should.be.exactly('sometoken');
            }, function (error) { }, function () {
                done();
            });
            requests[0].respond(202, { "Content-Type": "text/plain" }, "sometoken");
        });
        mocha_1.it('can do a post request');
        mocha_1.it('can do a patch request');
        mocha_1.it('can do a put request');
        mocha_1.it('can do a delete request');
        mocha_1.it('can do a request override');
    });
});
