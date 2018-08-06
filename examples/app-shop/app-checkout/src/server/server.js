import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cors from 'cors';
import fs from 'fs';

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
  console.log(`${APP_NAME} running with pid ${process.pid}`); // eslint-disable-line no-console
});

const app = Express();

app.use(cors());

app.use(cookieParser());

const serialiseState = (state) => JSON.stringify(state).replace(/</g, '\\x3c');

function renderFullPage(content, store) {
  const serialisedState = serialiseState(store.getState());
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${APP_PORT}/dist/${APP_NAME}.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Checkout</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script>window.${APP_REDUX_STATE_ID} = ${serialisedState}</script>
        <script src="http://localhost:${APP_PORT}/dist/${APP_NAME}.js"></script>
      </body>
    </html>
    `;
}

function renderEmbeddedApp(content, store) {
  const serialisedState = serialiseState(store.getState());
  return `
    <div id="${APP_CONTAINER_ID}">${content}</div>
    <script>window.${APP_REDUX_STATE_ID} = ${serialisedState}</script>
  `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const preloadedState = {
    [NAMESPACE]: {},
  };

  if (req.headers.accept === 'application/json') {
    return res.json(preloadedState);
  }

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore({
    history: memoryHistory,
    state: preloadedState,
  });
  const history = syncHistoryWithStore(memoryHistory, store);

  match(
    { history, routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const html = req.url.endsWith('?embedded') // TODO use url-pattern
          ? renderEmbeddedApp(content, store)
          : renderFullPage(content, store);
        res.send(html);
      }
    }
  );
});

app.listen(APP_PORT, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`${APP_NAME}: http://localhost:${APP_PORT}/checkout`); // eslint-disable-line no-console
  }
});
