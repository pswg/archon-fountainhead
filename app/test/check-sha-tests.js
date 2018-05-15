'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const crypto = require('crypto');
const nock = require('nock');

const repo = require('../config/github/repo');
const helper = require('../lib/helpers/check-sha');
const apiHelper = require('../lib/helpers/github-api');

Feature('Check SHA helper', () => {

  Scenario('Applying middleware', () => {
    const req = {};
    const res = {};
    var sha;

    Given('a request', () => {
      expect(req).to.be.an('object');
    });
    And('a response', () => {
      expect(res).to.be.an('object');
    });
    And('an environment variable with a random SHA', () => {
      const seed = (new Date()).valueOf().toString() + Math.random().toString();
      sha = crypto.createHash('sha1').update(seed).digest('hex');
      process.env.SHA = sha;
    });
    And('an environment variable with a random SHA', () => {
      const seed = (new Date()).valueOf().toString() + Math.random().toString();
      sha = crypto.createHash('sha1').update(seed).digest('hex');
      process.env.SHA = sha;
    });
    And('a mock call to get repo info', () => {
      nock('https://api.github.com')
        .get(`/repos/${repo.owner}/${repo.repo}/branches/${repo.branch}`)
        .reply(200, {commit: {sha}});
    });

    When('api middleware is applied', () => {
      apiHelper(req, res, () => {});
    });
    And('sha middleware is applied', () => {
      helper(req,res, () => {});
    });

    Then('the `current_sha` property is available in response', () => {
      expect(res)
        .to.have.nested.property('locals.current_sha')
        .that.is.a('string')
        .and.equals(sha);
    });
    And('the `commit_sha` property is available in request', () => {
      expect(res)
        .to.have.nested.property('locals.commit_sha')
        .that.is.a('string')
        .and.equals(sha);
    });
  });
});