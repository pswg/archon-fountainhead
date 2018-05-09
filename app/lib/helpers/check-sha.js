'use strict';

/**
 * Module dependencies
 */
const process = require('process');
const repo = require('../../config/github/repo');

/**
 * Express middleware
 */
module.exports = function(req, res, next) {
  res.locals.current_sha = process.env.SHA;

  req.api().repos.getBranch({
    owner: repo.owner,
    repo: repo.repo,
    branch: repo.branch
  }).then(({data, meta}) => {
    res.locals.commit_sha = data.commit.sha;
    next();
  }).catch(err => {
    next(err);
  });
};