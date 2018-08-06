import React from 'react';
import loggerFactory from './logger';
import historyFactory from './history';
import reactVerdiMiddlewareFactory from './react-verdi-middleware';

const clientManager = ({ appName, namespace, routeChangedActionType }) => {
  const logger = loggerFactory(appName);
  const history = historyFactory({ logger });
  const subscribers = [];

  logger('Setting up portal client');

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

  const reactVerdiMiddleware = namespace
    ? reactVerdiMiddlewareFactory({
        logger,
        appName,
        namespace,
        routeChangedActionType,
      })
    : null;

  return Object.freeze({
    history,
    reactVerdiMiddleware,
    logger,
  });
};

export default clientManager;
