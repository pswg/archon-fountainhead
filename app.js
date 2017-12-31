const cors = require('cors');
const express = require('express');
const app = express();
const git = require('git-utils');

const _any = o => { for(const k in o) if(o.hasOwnProperty(k)) return true; return false; };

// check for updates
app.use("/", (req, res, next) => {
    const repo = git.open(__dirname);
    try {
        const stat = repo.getStatus();
        if (_any(stat)) {
            res.sendStatus(503);
            server.close();
        } else {
            next();
        }
    } finally {
        repo.release();
    }
});

const server = app.listen(3000);