import { combineReducers } from 'redux';
import { without, get } from 'lodash';
import UrlPatter from 'url-pattern';

import { APP_PATTERN } from '../constants';

import {
  NAMESPACE,
  ADD_TO_BAG,
  REMOVE_FROM_BAG,
  SELECT_PRODUCT,
  ROUTE_CHANGED,
} from './constants';

const urlPattern = new UrlPatter(APP_PATTERN);

const productIdsInBag = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_BAG:
      return state.concat(action.payload);
    case REMOVE_FROM_BAG:
      return without(state, action.payload);
    default:
      return state;
  }
};

const selectedProductId = (state = null, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.payload;
    case ROUTE_CHANGED:
      return get(urlPattern.match(action.payload), 'productId') || state;
    default:
      return state;
  }
};

const appReducers = combineReducers({
  products: (state = {}) => state,
  selectedProductId,
  productIdsInBag,
});

module.exports = combineReducers({
  [NAMESPACE]: appReducers,
});
