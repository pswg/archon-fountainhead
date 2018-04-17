'use strict';

const process = require('process');

module.exports = {
  baseUrl: process.env.GITHUB_API_BASEURL || 'https://api.github.com',
  headers: {
    'User-Agent': 'request'
  }
};