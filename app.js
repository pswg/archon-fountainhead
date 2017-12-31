const { execSync } = require('child_process');
const cors = require('cors');
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
    }
});

app.get('/merge',function(req,res){
    res.sendFile('views/merge.html');
});

app.post('/merge', function(req, res) {
    res.send('You sent "' + req.body.prNumber + '".');
});

const server = app.listen(3000);