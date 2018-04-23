'use strict';

/**
 * Module dependencies
 */
const process = require('process');
const api = require('../../lib/github-api');
const repo = require('../../config/github/repo');

/**
 * Express middleware
 */
module.exports = function(req, res, next) {
  if (process.env.SHA) {
    api.repos.getBranch({
      owner: repo.owner,
      repo: repo.repo,
      branch: repo.branch
    }).then(({data, meta}) => {
      if (data.commit.sha !== process.env.SHA) {
        res.status(503).send('A new version is available... server will restart soon');
      } else {
        next();
      }
    }).catch(err => {
      next(err);
    });
  } else {
    console.warn('SHA not defined. If this is a production environment, it may be vulnerable to attack.');
    next();
  }
};