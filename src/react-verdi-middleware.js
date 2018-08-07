import historyFactory from './history';

// TODO split this into history-middleware and publisher-middleware
const reactVerdiMiddleware = ({
  logger,
  namespace,
  appName,
  routeChangedActionType,
}) => {
  const history = historyFactory({ logger });

  const isOwnAction = ({ type }) => type.startsWith(namespace);

  const matchTarget = ({ target }) => !target || target === namespace;

  const replaceType = ({ type }) =>
    `${namespace}/${type.substring(type.indexOf('/') + 1)}`;

  const actionSubscriber = (store) => (action) => {
    if (!isOwnAction(action) && matchTarget(action)) {
      logger(`Subscriber is processing action ${action.type}`);
      store.dispatch({
        payload: action.payload,
        type: replaceType(action),
      });
    }
  };

  const historyListener = (store) => ({ pathname }) => {
    logger(`History listener detected change ${history.location.pathname}`);

    store.dispatch({
      debug: `${appName}-history-listener`,
      type: routeChangedActionType,
      payload: pathname,
    });
  };

  return (store) => {
    logger('Initialising react-verdi middleware');

    window.__REACT_COMPOSER__.subscribe(actionSubscriber(store));

    if (routeChangedActionType) {
      history.listen(historyListener(store));
    }

    return (next) => (action) => {
      next(action);
      if (action.publish) {
        window.__REACT_COMPOSER__.publish(action);
      }
    };
  };
};

export default reactVerdiMiddleware;
