import React from 'react';
import loggerFactory from './logger';
import historyFactory from './history';

const clientManager = (appName) => {
  const logger = loggerFactory(appName);
  const history = historyFactory({ logger });
  const subscribers = [];

  logger(`react version: $${React.version}`);

  logger('setting up portal client');

  window.__REACT_COMPOSER__ = window.__REACT_COMPOSER__ || {
    apps: {},
    publish: function publish(action) {
      subscribers.map((subscribe) => subscribe(action));
    },
    subscribe: function subscribe(subscriber) {
      subscribers.push(subscriber);
    },
    history,
  };

  return Object.freeze({
    history,
  });
};

export default clientManager;
