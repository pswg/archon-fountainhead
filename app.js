'use strict';

const { exec } = require('child_process');
const { execSync } = require('child_process');
const bodyParser = require('body-parser');
const express = require('express');
const rp = require('request-promise');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// check for updates
app.use("/", (req, res, next) => {
    const gitStatus = execSync('git status');
    if (gitStatus.indexOf('up-to-date') == -1) {
        res.sendStatus(503);
        server.close();
    } else {
        next();
    }
});

app.get('/merge', function (req, res) {
    res.sendFile('merge.html', { root: __dirname + '/views/' });
});

app.post('/merge', function (req, res) {
    const pr = parseInt(req.body.prNumber);
    const prUri = `https://api.github.com/repos/impyrio/archon-fountainhead/pulls/${pr}`;
    const opts = {
        json: true,
        headers: { 'User-Agent': 'request' }
    };
    rp.get({ uri: prUri, ...opts })
        .then((json) => {
            const mergeUri = `${prUri}/merge`;
            const body = {
                commit_title : `Merge pull request #${pr} from ${json.head.label}`,
                commit_message : json.title,
                sha : json.merge_commit_sha,
                merge_method: 'merge'
            };

            return rp.put({uri: mergeUri, body, ...opts})
                .then(({ message, sha }) => {
                    res.send(`Result: ${message} \nsha: ${sha}`);
                });
        })
        .catch(({ message, documentation_url }) => {
            res.send(`Failed: ${message}`);
        });
});

const server = app.listen(3000);