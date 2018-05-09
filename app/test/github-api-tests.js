'use strict';

const nock = require('nock');
const expect = require('chai').expect;
var _ = require('lodash');

const routes = require('@octokit/rest/lib/routes.json');
const middleware = require('../lib/helpers/github-api');

Feature('GitHub API middleware', () => {

  Scenario('Applying middleware', () => {
    const req = {};
    const res = {};

    Given('a request', () => {
      expect(req).to.be.an('object');
    });
    And('a response', () => {
      expect(res).to.be.an('object');
    });

    When('middleware is applied', () => {
      middleware(req, res, () => {});
    });

    Then('the `api` function is available in request', () => {
      expect(req)
        .to.have.property('api')
        .that.is.a('function'); 
    });
  });

  Scenario('Obtaining an "as archon" api handle', () => {
    const req = {headers: {cookie: ['foo=bar']}};
    const res = {};
    const as = 'archon';
    var api;
    var sentCookies;

    Given('a request that includes a cookie', () => {
      expect(req)
        .to.have.nested.property('headers.cookie')
        .that.is.an('array');
    });
    And('mode = as archon', () => {
      expect(as).to.equal('archon');
    });
    And('a mock call to get user info', () => {
      nock('https://api.github.com')
        .get('/user')
        .reply(200, '{}', {
          'X-Detect-Cookie': (req, res, body) => {
            sentCookies = [...(req.headers.cookie || [])];
          }
        });
    });

    When('middleware is applied', () => {
      middleware(req, res, () => {});
    });

    Then('`api` function is returns object', () => {
      api = req.api({as});
      expect(api).to.be.an('object');
    });
    And('requests do NOT include the cookie', () => {
      api.users.get().then(() => {
        expect(sentCookies).to.deep.equal([]);
      }).catch(err => assert.fail(err));
    });
  });

  Scenario('Obtaining an "as user" api handle', () => {
    const req = {headers: {cookie: ['foo=bar']}};
    const res = {};
    const as = 'user';
    var api;
    var sentCookies;

    Given('a request that includes a cookie', () => {
      expect(req)
        .to.have.nested.property('headers.cookie')
        .that.is.an('array');
    });
    And('mode = as user', () => {
      expect(as).to.equal('user');
    });
    And('a mock call to get user info', () => {
      nock('https://api.github.com')
        .get('/user')
        .reply(200, '{}', {
          'X-Detect-Cookie': (req, res, body) => {
            sentCookies = [...(req.headers.cookie || [])];
          }
        });
    });

    When('middleware is applied', () => {
      middleware(req, res, () => {});
    });

    Then('`api` function is returns object', () => {
      api = req.api({as});
      expect(api).to.be.an('object');
    });
    And('requests include the cookie', () => {
      api.users.get().then(() => {
        expect(sentCookies).to.deep.equal(req.headers.cookie);
      }).catch(err => assert.fail(err));
    });
  });

  Scenario('Throws error when invalid `as` option', () => {
    const req = {headers: {cookie: ['foo=bar']}};
    const res = {};
    const as = 'foo';
    var api;
    var sentCookies;

    Given('a request', () => {
      expect(req).to.be.an('object');
    });
    And('a response', () => {
      expect(res).to.be.an('object');
    });
    And('mode neither archon or user', () => {
      expect(['archon', 'user']).to.not.include(as);
    });

    When('middleware is applied', () => {
      middleware(req, res, () => {});
    });

    Then('`api` function throws an error', () => {
      expect(() => req.api({as: 'foo'})).to.throw();
    });
  });
});