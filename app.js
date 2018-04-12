const { execSync } = require('child_process');
const bodyParser = require('body-parser');
const express = require('express');
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
    const cmd = 'curl https://api.github.com/repos/impyrio/archon-fountainhead/pulls/' +
        req.body.prNumber +
        '/merge';
    const result = execSync(cmd);
    console.log('Results: ' + result)
    res.send('Archon merged "' + req.body.prNumber + '". \nResults:\n\t' + result.message);
});

const server = app.listen(3000);