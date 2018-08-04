import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import cors from 'cors';
import fs from 'fs';

import logger from './logger';
import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';
import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PORT,
  APP_NAME,
} from '../common/constants';

fs.writeFile('./pid', process.pid, (err) => {
  if (err) throw err;
  logger.info(`${APP_NAME} running with pid ${process.pid}`);
});


const app = Express();

app.use(cors());

app.use(cookieParser());

function renderFullPage(content, store) {
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${APP_PORT}/dist/${APP_NAME}.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Product</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script>window.${APP_REDUX_STATE_ID} = ${stateString}</script>
      <script src="http://localhost:${APP_PORT}/dist/${APP_NAME}.js"></script>
      </body>
    </html>
    `;
}

function renderEmbeddedApp(content, store) {
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
  return `
    <div id="${APP_CONTAINER_ID}">${content}</div>
    <script>window.${APP_REDUX_STATE_ID} = ${stateString}</script>
  `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const { url } = req;
  const pathname = url.indexOf('?') !== -1 ? url.substring(0, url.indexOf('?')) : url;

  const preloadedState = { [NAMESPACE]: { selectedPage: pathname } };

  if (req.headers.accept === 'application/json') {
    return res.json(preloadedState);
  }

  const store = configureStore(preloadedState);

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );
  const html = req.url.endsWith('?embedded') // TODO use url-pattern
    ? renderEmbeddedApp(content, store)
    : renderFullPage(content, store);
  res.send(html);
});

app.listen(APP_PORT, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`${APP_NAME}: http://localhost:${APP_PORT}`);
  }
});
