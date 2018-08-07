import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../modules';

const configureStore = ({ state, middlewares = [] }) => {
  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...middlewares.filter(Boolean)))
  );
  return store;
};

export default configureStore;
