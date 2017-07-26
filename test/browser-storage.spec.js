"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var enums_1 = require("../src/client/lib/enums");
var browser_storage_1 = require("../src/client/lib/browser-storage");
var storage_stubs_1 = require("./storage-stubs");
mocha_1.describe('Browser storage', function () {
    var instance;
    mocha_1.describe('Local storage', function () {
        mocha_1.before(function () {
            instance = browser_storage_1.default.getStorage(enums_1.StorageType.Local);
        });
        mocha_1.it('can get storage api', function () {
            instance.should.not.be.null();
        });
        mocha_1.it('can set an item', function () {
            // act
            instance.set('test', 15);
            // assert
            storage_stubs_1.default.localStorage.setItem.withArgs('test', 15).calledOnce.should.be.true();
        });
        mocha_1.it('can get an item', function () {
            // setup
            storage_stubs_1.default.localStorage.getItem.withArgs('someitem').returns('data');
            // act
            var data = instance.get('someitem');
            // assert
            data.should.equal('data');
        });
        mocha_1.it('can remove an item', function () {
            // act
            instance.remove('test');
            // assert
            storage_stubs_1.default.localStorage.removeItem.withArgs('test').calledOnce.should.be.true();
        });
        mocha_1.it('can clear the storage', function () {
            // act
            instance.clear();
            // assert
            storage_stubs_1.default.localStorage.clear.calledOnce.should.be.true();
        });
    });
    mocha_1.describe('Session storage', function () {
        mocha_1.before(function () {
            instance = browser_storage_1.default.getStorage(enums_1.StorageType.Session);
        });
        mocha_1.it('can get storage api', function () {
            instance.should.not.be.null();
        });
        mocha_1.it('can get an item');
        mocha_1.it('can remove an item');
        mocha_1.it('can clear the storage');
    });
    mocha_1.describe('Cookie storage', function () {
        mocha_1.before(function () {
            instance = browser_storage_1.default.getStorage(enums_1.StorageType.Cookie);
        });
        mocha_1.it('can get storage api', function () {
            instance.should.not.be.null();
        });
        mocha_1.it('can get an item');
        mocha_1.it('can remove an item');
        mocha_1.it('can clear the storage');
    });
});
