import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer from '../modules';

const configureStore = ({ history, state, middlewares = [] }) => {
  const router = routerMiddleware(history);

  const activeMiddlewares = [router, ...middlewares].filter(Boolean);

  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...activeMiddlewares))
  );

  return store;
};

export default configureStore;
