const { execSync } = require('child_process');
const cors = require('cors');
const express = require('express');
const app = express();

// check for updates
app.use("/", (req, res, next) => {
    const gitStatus = execSync('git status');
    if (gitStatus.indexOf('up-to-date') == -1) {
        res.sendStatus(503);
        server.close();
    }
});

const server = app.listen(3000);