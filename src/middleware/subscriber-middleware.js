const subscriberMiddleware = ({ logger, namespace }) => {
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

  return (store) => {
    logger('Initialising subscriber middleware');

    window.__REACT_COMPOSER__.subscribe(actionSubscriber(store));

    return (next) => (action) => {
      next(action);
    };
  };
};

export default subscriberMiddleware;
