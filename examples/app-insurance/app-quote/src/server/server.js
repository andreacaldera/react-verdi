import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cors from 'cors';
import fs from 'fs';

import logger from './logger';
import Quote from '../common/components/Quote';
import { APP_CONTAINER_ID, APP_PORT, APP_NAME } from '../common/constants';

const port = process.env.PORT || APP_PORT;

const app = Express();

app.use(cors());

app.use(cookieParser());

function renderFullPage(content) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/dist/${APP_NAME}.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Quote</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script src="/dist/${APP_NAME}.js"></script>
      </body>
    </html>
    `;
}

fs.writeFile('./pid', process.pid, (err) => {
  if (err) throw err;
  logger.info(`${APP_NAME} running with pid ${process.pid}`);
});

function renderEmbeddedApp(content) {
  return `
    <div id="${APP_CONTAINER_ID}">${content}</div>
  `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const content = renderToString(<Quote />);
  const html = req.url.endsWith('?embedded') // TODO use url-pattern
    ? renderEmbeddedApp(content)
    : renderFullPage(content);
  res.send(html);
});

app.listen(port, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`${APP_NAME}: http://localhost:${port}/`);
  }
});
