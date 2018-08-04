import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import superagent from 'superagent';
import fs from 'fs';

import config from './config/default';
import logger from './logger';
import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { APP_NAME, APP_CONTAINER_ID } from '../common/constants';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';

fs.writeFile('./pid', process.pid, (err) => {
  if (err) throw err;
  logger.info(`${APP_NAME} running with pid ${process.pid}`);
});

const app = Express();
const port = 3001;

const activeApps = config.apps.filter(({ disable }) => !disable);

app.use(cookieParser());

const serialiseState = (state) => JSON.stringify(state).replace(/</g, '\\x3c');

const appUrl = ({ appPort }) => `http://localhost:${appPort}`;

function renderFullPage(content, appsContent, store) {
  const cssLinks = activeApps
    .map(
      (appConfig) =>
        `<link rel="stylesheet" type="text/css" href="${appUrl(appConfig)}${appConfig.cssPath}" />`
    )
    .join(' ');

  const jsLinks = activeApps
    .map((appConfig) => `<script src="${appUrl(appConfig)}${appConfig.jsPath}"></script>`)
    .join(' ');

  const appsHtml = appsContent
    .map(
      ({ containerId, html, className = '' }) => `
        <div class="${className}"><div id="${containerId}"> 
          ${html}
        </div></div>
      `
    )
    .join(' ');

  const serialisedState = serialiseState(store.getState());

  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/dist/app-shop.css" />
        ${cssLinks}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Shop</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">
          ${content}
        </div>
        ${appsHtml}
        <script>window.__PARENT_APP_INITIAL_STATE__ = ${serialisedState}</script>
        <script src="/dist/app-shop.js"></script>
        ${jsLinks}
      </body>
    </html>
    `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/', Express.static(path.join(__dirname, '../../public')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

const loadAppContent = (url, { name, urlPathRegex, containerId, className, appPort }) => {
  const matches = url.match(new RegExp(urlPathRegex));
  logger.info(`Matching ${name} on URL ${url} using regex ${urlPathRegex}: ${matches}`);
  if (!matches) {
    return {
      html: '',
      containerId,
      className,
    };
  }
  return superagent
    .get(`http://localhost:${appPort}${url}?embedded`)
    .then(({ text }) => ({
      html: text,
      containerId,
      className,
    }))
    .catch((err) => {
      logger.error(`Unable to load ${name}`, err);
      return {
        html: `<i class="error">Unable to load <bold>${name}</bold></i>`,
        containerId,
        className,
      };
    });
};

app.use((req, res) =>
  Promise.all(activeApps.map((appConfig) => loadAppContent(req.url, appConfig))).then(
    (appsContent) => {
      const preloadedState = { [NAMESPACE]: { meta: {} } };
      const store = configureStore(preloadedState);

      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
      res.send(renderFullPage(content, appsContent, store));
    }
  )
);

app.listen(port, (err) => {
  if (err) {
    logger.error('Unable to start app listener', err);
  } else {
    logger.info(`${APP_NAME}: http://localhost:${port}/`);
  }
});
