import {
  historySagasFactory,
  publisherSagasFactory,
  subscriberSagasFactory,
} from 'react-verdi';
import { takeEvery, put, select } from 'redux-saga/effects';

import { APP_NAME } from '../common/constants';
import {
  CHECKOUT,
  ROUTE_CHANGED,
  NAMESPACE,
  ERROR,
} from '../common/modules/constants';
import { getProductsInBag } from '../common/modules/selectors';

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

export default function* rootSaga() {
  yield [
    publisherSagasFactory()(),
    watchCheckout(),
    subscriberSagasFactory({
      appName: APP_NAME,
      namespace: NAMESPACE,
      errorActionType: ERROR,
    })(),
    historySagasFactory({
      appName: APP_NAME,
      routeChangedActionType: ROUTE_CHANGED,
      errorActionType: ERROR,
    })(),
  ];
}
