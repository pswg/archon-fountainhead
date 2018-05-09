'use strict';

const assert = require('assert');
const expect = require('chai').expect;

const feather = require('feather-icons');
const helper = require('../lib/helpers/feather-icon');

describe(':feather-icon Helper', function () {
  it('should inject a filter into the response\'s locals', (done) => {
    // GIVEN
    const req = {};
    const res = {};
    // WHEN
    helper(req, res, () => {});
    // THEN
    expect(res).to.have.nested.property('locals.filters.feather-icon');
    expect(res.locals.filters['feather-icon']).to.be.a('function');
    done();
  });
  
  it('should return an svg document', (done) => {
    // GIVEN
    const name = 'x';
    // WHEN
    const icon = helper.filter(name);
    // THEN
    expect(icon).to.match(/^<svg.*<\/svg>$/);
    done();
  });
});
