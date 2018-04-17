'use strict';

const process = require('process');

const apiConfig = {
    baseUrl: process.env.GITHUB_API_BASEURL || 'https://api.github.com',
    headers: {
        'User-Agent': 'request'
    }
};

const repo = {
    branch: 'master',
    owner: 'impyrio',
    repo: 'archon-fountainhead'
}

module.exports = {
    repo,
    apiConfig
};