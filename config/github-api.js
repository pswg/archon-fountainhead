'use strict';

const process = require('process');

const apiConfig = {
    baseUri: process.env.GITHUB_API_BASEURI || 'https://api.github.com',
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