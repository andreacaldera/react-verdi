import { eventChannel } from 'redux-saga';
import { call, take, put, cancelled } from 'redux-saga/effects';

import { NAMESPACE } from '../common/modules/constants';

function registerSubscribe() {
  return eventChannel((emitter) => {
    if (window.__REACT_COMPOSER__) {
      window.__REACT_COMPOSER__.subscribe((action) => emitter(action));
    }
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

const isOwnAction = ({ type }) => type.startsWith(NAMESPACE);

const matchTarget = ({ target }) => !target || target === NAMESPACE;

const replaceType = ({ type }) => {
  const newAction = `${NAMESPACE}/${type.substring(type.indexOf('/') + 1)}`;
  return newAction;
};

function* subscribe() {
  const subscribeHandler = yield call(registerSubscribe);
  const forever = true;
  try {
    while (forever) {
      const action = yield take(subscribeHandler);
      if (!isOwnAction(action) && matchTarget(action)) {
        yield put({
          ...action,
          type: replaceType(action),
          publish: false,
        });
      }
    }
  } catch (err) {
    if (yield cancelled()) {
      subscribeHandler.close();
    } else {
      yield put({ type: 'ERROR', err });
    }
  }
}

export default function* rootSaga() {
  yield [subscribe()];
}
