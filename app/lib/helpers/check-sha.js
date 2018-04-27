'use strict';

/**
 * Module dependencies
 */
import process from 'process';
import api from 'lib/github-api';
import repo from'config/github/repo';

/**
 * Express middleware
 */
export default function (req, res, next) {
  res.locals.current_sha = process.env.SHA;
  api.repos.getBranch({
    owner: repo.owner,
    repo: repo.repo,
    branch: repo.branch
  }).then(({ data, meta }) => {
    res.locals.commit_sha = data.commit.sha;
    next();
  }).catch(err => {
    next(err);
  });
}