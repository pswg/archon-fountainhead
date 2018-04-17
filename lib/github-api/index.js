'use strict';

const GitHub = require('@octokit/rest');
const apiConfig = require('../../config/github-api').apiConfig;

module.exports = GitHub(apiConfig);