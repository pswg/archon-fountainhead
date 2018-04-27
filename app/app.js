'use strict';

// Add the root project directory to the app module search path
import 'app-module-path/register';

/**
 * Module dependencies
 */
import { urlencoded } from "body-parser";
import express, { static } from "express";
import { join } from "path";

import homeController from 'controllers/home';
import loreController from 'controllers/lore';
import pullsController from 'controllers/pulls';

const app = express();

app.use(urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', join(__dirname, '/views'));

app.use('/assets', static(join(__dirname, 'assets')));

app.use(featherIconHelper);
app.use(checkShaHelper);

app.use('/', homeController);
app.use('/lore', loreController);
app.use('/pulls', pullsController);

app.use(errorHandlerHelper);

const server = app.listen(process.env.PORT || 3000);