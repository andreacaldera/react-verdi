import Express from 'express';
import fs from 'fs';

import config from '../config/default';
import logger from './logger';

const APP_NAME = 'app-config';

fs.writeFile('./pid', process.pid, (err) => {
  if (err) {
    throw err;
  }
  logger.info(`${APP_NAME} running with pid ${process.pid}`);
});

const app = Express();
const port = global.process.env.PORT || 8081;

const baseUrl = (name) =>
  global.process.env[name] || config.appShop.endpoints[name];

app.use((req, res) => {
  res.json({
    appShop: {
      endpoints: {
        appShopBaseUrl: baseUrl('APP_SHOP_BASE_URL'),
        appProductBaseUrl: baseUrl('APP_PRODUCT_BASE_URL'),
        appCheckoutBaseUrl: baseUrl('APP_CHECKOUT_BASE_URL'),
        appHeaderBaseUrl: baseUrl('APP_HEADER_BASE_URL'),
        appFooterBaseUrl: baseUrl('APP_FOOTER_BASE_URL'),
      },
    },
  });
});

app.listen(port, (err) => {
  if (err) {
    logger.error('Unable to start app listener', err);
  } else {
    logger.info(`${APP_NAME}: http://localhost:${port}/`);
  }
});
