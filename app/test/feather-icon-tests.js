'use strict';

const assert = require('assert');
const expect = require('chai').expect;

const feather = require('feather-icons');
const helper = require('../lib/helpers/feather-icon');

Feature('Feather icon helper', () => {

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
      helper(req, res, () => {});
    });

    Then('the `api` function is available in request', () => {
      expect(res)
        .to.have.nested.property('locals.filters.feather-icon')
        .that.is.a('function');
    });
  });

  Scenario('Applying the filter', () => {
    const name = 'x';
    var result;

    Given('a name of a knwon feather icon', () => {
      expect(Object.keys(feather.icons)).to.contain(name);
    });

    When('filter is invoked or given icon', () => {
      result = helper.filter(name);
    });
    
    Then('result is an svg element', () => {
      expect(result).to.be.a('string').that.match(/^<svg.*<\/svg>$/);
    });
  });

});