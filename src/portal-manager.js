import loggerFactory from './logger';
import historyFactory from './history';
import portalMiddlewareFactory from './middleware/portal-middleware';
import publisherMiddlewareFactory from './middleware/publisher-middleware';
import subscriberMiddlewareFactory from './middleware/subscriber-middleware';
import historyMiddlewareFactory from './middleware/history-middleware';

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

  const subscriberMiddleware = subscriberMiddlewareFactory({
    logger,
    namespace,
  });

  const publisherMiddleware = publisherMiddlewareFactory({ logger });

  const historyMiddleware = historyMiddlewareFactory({
    logger,
    routeChangedActionType,
  });

  const portalMiddleware = portalMiddlewareFactory({
    routeChangedActionType,
    logger,
  });

  return Object.freeze({
    history,
    portalMiddleware,
    publisherMiddleware,
    subscriberMiddleware,
    historyMiddleware,
    logger,
  });
};

export default clientManager;
