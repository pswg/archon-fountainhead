'use strict';

const process = require('process');

module.exports = {
  branch: process.env.GITHUB_REPO_BRANCH || 'master',
  owner: process.env.GITHUB_REPO_OWNER || 'impyrio',
  repo: process.env.GITHUB_REPO_REPO || 'archon-fountainhead'
};