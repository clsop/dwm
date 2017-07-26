import { describe, it, before } from 'mocha';
import * as sinon from 'sinon';

import { StorageType } from '../src/client/lib/enums';
import BrowserStorage from '../src/client/lib/browser-storage';

import StorageStubs from './storage-stubs';

describe('Browser storage', () => {
	let instance;

	describe('Local storage', () => {
		before(() => {
			instance = BrowserStorage.getStorage(StorageType.Local);
		});

		it('can get storage api', () => {
			instance.should.not.be.null();
		});

		it('can set an item', () => {
			// act
			instance.set('test', 15);

			// assert
			StorageStubs.localStorage.setItem.withArgs('test', 15).calledOnce.should.be.true();
		});

		it('can get an item', () => {
			// setup
			StorageStubs.localStorage.getItem.withArgs('someitem').returns('data');

			// act
			let data = instance.get('someitem');

			// assert
			data.should.equal('data');
		});

		it('can remove an item', () => {
			// act
			instance.remove('test');

			// assert
			StorageStubs.localStorage.removeItem.withArgs('test').calledOnce.should.be.true();
		});

		it('can clear the storage', () => {
			// act
			instance.clear();

			// assert
			StorageStubs.localStorage.clear.calledOnce.should.be.true();
		});
	});

	describe('Session storage', () => {
		before(() => {
			instance = BrowserStorage.getStorage(StorageType.Session);
		});

		it('can get storage api', () => {
			instance.should.not.be.null();
		});

		it('can get an item');

		it('can remove an item');

		it('can clear the storage');
	});

	describe('Cookie storage', () => {
		before(() => {
			instance = BrowserStorage.getStorage(StorageType.Cookie);
		});

		it('can get storage api', () => {
			instance.should.not.be.null();
		});

		it('can get an item');

		it('can remove an item');

		it('can clear the storage');
	});
});