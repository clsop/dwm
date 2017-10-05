import { describe, it, beforeEach } from 'mocha';

import BaseService from '../../src/client/service/service';

import ApiStubs from './browser-api-stubs';

describe('Service', () => {
	describe('Base service', () => {
		let requests = [];
		ApiStubs.XMLHttpRequest.onCreate = (xhr) => {
			requests.push(xhr);
		};

		let instance = new BaseService<any>({ name: 'test', baseUrl: 'http://somewhereelse', headers: {
			Authorization: 'Bearer hereisatoken'
		}});

		beforeEach(() => {
			requests = [];
		});

		it('can do a get request with JSON response', (done) => {
			// act
			instance.get().subscribe((value) => {
				//assert
				value.should.have.length(2);
			},(error) => {}, () => {
				done();
			});

			requests[0].respond(202, { "Content-Type": "application/json" }, JSON.stringify([{id: 10, name: "test"},{id: 12, name: "test2"}]));
		});

		it('can do a get request with plain text response', (done) => {
			// act
			instance.get({ responseType: 'text' }).subscribe((token) => {
				//assert
				token.should.be.exactly('sometoken');
			}, error => {}, () => {
				done();
			});
			
			requests[0].respond(202, { "Content-Type": "text/plain" }, "sometoken");
		});

		it('can do a post request');

		it('can do a patch request');

		it('can do a put request');

		it('can do a delete request');

		it('can do a request override');
	});
});