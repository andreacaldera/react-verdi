import { takeEvery, put, select } from 'redux-saga/effects';

import { CHECKOUT } from './constants';
import { getProductsInBag } from './selectors';

const APP_CHECKOUT = 'APP_CHECKOUT_NAMESPACE';

export function* checkout(action) {
  if (action.publish) {
    return;
  }
  const products = yield select(getProductsInBag);
  yield put({
    type: CHECKOUT,
    payload: products,
    publish: true,
    target: APP_CHECKOUT,
  });
}

export function* watchCheckout() {
  yield takeEvery(CHECKOUT, checkout);
}

export default function* sagas() {
  yield [watchCheckout()];
}
