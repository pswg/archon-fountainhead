'use strict';

const process = require('process');
const bodyParser = require('body-parser');
const express = require('express');
const rp = require('request-promise');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// check for updates
app.use("/", (req, res, next) => {
    if (process.env.SHA) {
        const uri = `https://api.github.com/repos/impyrio/archon-fountainhead/branches/master`;
        const opts = {
            json: true,
            headers: { 'User-Agent': 'request' }
        };
        rp.get({uri, ...opts})
            .then(({name, commit: {sha}}) => {
                if (sha !== process.env.SHA) {
                    res.status(503).send('A new version is available... server will restart soon');
                } else {
                next();
                }
            });
    } else {
        console.warn('No SHA defined. If this is a production environment, it may be vulnerable to attack.');
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