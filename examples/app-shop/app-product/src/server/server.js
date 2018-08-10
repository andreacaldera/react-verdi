import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import UrlPatter from 'url-pattern';
import _ from 'lodash';
import cors from 'cors';
import fs from 'fs';

import logger from './logger';
import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_PORT,
  APP_NAME,
} from '../common/constants';

fs.writeFile('./pid', process.pid, (err) => {
  if (err) throw err;
  logger.info(`${APP_NAME} running with pid ${process.pid}`);
});

const port = global.process.env.PORT || APP_PORT;

const urlPattern = new UrlPatter(APP_PATTERN);

const products = {
  one: {
    id: 'one',
    name: 'Pretty little red dress',
  },
  two: {
    id: 'two',
    name: 'Some shoes whatevs',
  },
  three: {
    id: 'three',
    name: 'Skinny hipster jeans',
  },
};

const app = Express();

app.use(cors());

app.use(cookieParser());

function renderFullPage(content, store) {
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/dist/${APP_NAME}.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Product</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script>window.${APP_REDUX_STATE_ID} = ${stateString}</script>
      <script src="/dist/${APP_NAME}.js"></script>
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

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

const getPreloadedState = (req) => {
  const selectedProductId = _.get(urlPattern.match(req.url), 'productId');
  return { [NAMESPACE]: { selectedProductId, products } };
};

app.use('/api/appProduct', (req, res) => {
  logger.debug(`Loading state from URL ${req.url}`);
  res.json(getPreloadedState(req));
});

app.use((req, res) => {
  const store = configureStore({
    state: getPreloadedState(req),
  });

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );
  // TODO use url-pattern
  const html = req.url.endsWith('?embedded')
    ? renderEmbeddedApp(content, store)
    : renderFullPage(content, store);
  res.send(html);
});

app.listen(port, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`${APP_NAME}: http://localhost:${port}/products`);
  }
});
