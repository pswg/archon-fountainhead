'use strict';

import { Router } from "express";
import repo from "config/github/repo";
import api from "lib/github-api";

const router = Router();

router.get('/', (req, res) => {
  res.render('home/index');
});

export default router;