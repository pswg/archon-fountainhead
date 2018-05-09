'use strict';

/**
 * Module dependencies.
 */
const feather = require('feather-icons');
const octokit = require('@octokit/rest');
const api_config = require('../../config/github/api');

/**
 * Express middleware function.
 */
module.exports = (req, res, next) => {
  function addCookie(req, opt) {
    if (!req.headers || !req.headers.cookie) return;
    if (!opt.headers) opt.headers = {};

    opt.headers.cookie = req.headers.cookie;
  };

  req.api = ({as = 'archon', ...options} = {}) => {
    if (!api_config.hasOwnProperty(as)) {
      throw new Error(`unrecognized option "as": ${JSON.stringify(as)}`);
    }
    if (as == 'user') addCookie(req, options);
  
    return octokit({baseUrl: api_config[as].uri, ...options});
  };

  next();
};