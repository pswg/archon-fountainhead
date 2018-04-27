'use strict';

import { ok } from "assert";
import { env } from "process";
import { spawn } from "child_process";

describe('Continuous Integration', function () {
    it('should be at least one test to verify mocha is running', function () {
        ok(true);
    });
});
