'use strict';

const GitHub = require('@octokit/rest');
const api = require('../../config/github/api');

module.exports = GitHub(api);