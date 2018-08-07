import historyFactory from '../history';

const historyMiddleware = ({ logger, routeChangedActionType }) => {
  const history = historyFactory({ logger });

  const historyListener = (store) => ({ pathname }) => {
    logger(`History listener detected change ${history.location.pathname}`);

    store.dispatch({
      type: routeChangedActionType,
      payload: pathname,
    });
  };

  return (store) => {
    logger('Initialising history middleware');

    if (routeChangedActionType) {
      history.listen(historyListener(store));
    }

    return (next) => (action) => {
      next(action);
    };
  };
};

export default historyMiddleware;
