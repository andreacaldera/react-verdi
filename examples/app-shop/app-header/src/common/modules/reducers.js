import { combineReducers } from 'redux';

import { NAMESPACE, ROUTE_CHANGED } from './constants';

const selectedPage = (state = [], action) => {
  switch (action.type) {
    case ROUTE_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

const appReducers = combineReducers({
  selectedPage,
});

module.exports = combineReducers({
  [NAMESPACE]: appReducers,
});
