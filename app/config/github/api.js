'use strict';

const process = require('process');

const default_uri = 'https://api.github.com';

module.exports = {
  archon: {
    uri: process.env.GITHUB_API_ARCHON_URI || default_uri
  }, 
  user: {
    uri: process.env.GITHUB_API_USER_URI || default_uri
  }
};