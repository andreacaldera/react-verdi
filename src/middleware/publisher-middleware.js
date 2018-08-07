const publisherMiddleware = ({ logger }) => () => {
  logger('Initialising publisher middleware');
  return (next) => (action) => {
    next(action);
    if (action.publish) {
      window.__REACT_COMPOSER__.publish(action);
    }
  };
};

export default publisherMiddleware;
