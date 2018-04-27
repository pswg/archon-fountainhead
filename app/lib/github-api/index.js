'use strict';

import GitHub from "@octokit/rest";
import api from "config/github/api";

export default GitHub(api);