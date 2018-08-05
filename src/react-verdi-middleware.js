const reactVerdiMiddleware = ({ logger, appName, namespace }) => {
  const isOwnAction = ({ type }) => type.startsWith(namespace);

  const matchTarget = ({ target }) => !target || target === namespace;

  const replaceType = ({ type }) => `${namespace}/${type.substring(type.indexOf('/') + 1)}`;

  return (store) => {
    logger('Initialising middleware');
    const actionSubscriber = (action) => {
      if (!isOwnAction(action) && matchTarget(action)) {
        logger(`Subscriber is processing action ${action.type}`);
        store.dispatch({
          payload: action.payload,
          type: replaceType(action),
        });
      }
    };
    window.__REACT_COMPOSER__.subscribe(actionSubscriber);

    return (next) => (action) => {
      next(action);
      if (action.publish) {
        window.__REACT_COMPOSER__.publish(action);
      }
    };
  };
};

export default reactVerdiMiddleware;
