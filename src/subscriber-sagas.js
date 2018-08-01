import { eventChannel } from 'redux-saga';
import {
  put,
  call,
  cancelled,
  take,
} from 'redux-saga/effects';

import loggerFactory from './logger';

const historySagasFactory = ({
  namespace,
  errorActionType,
  appName,
}) => {
  const logger = loggerFactory(appName);

  const isOwnAction = ({ type }) =>
    type.startsWith(namespace);

  const matchTarget = ({ target }) =>
    !target || target === namespace;

  const replaceType = ({ type }) =>
    `${namespace}/${type.substring(type.indexOf('/') + 1)}`;

  function registerSubscribe() {
    return eventChannel((emitter) => {
      window.__REACT_COMPOSER__.subscribe((action) => emitter(action));
      const unsubscribe = () => {};
      return unsubscribe;
    });
  }

  function* processAction(action) {
    if (!isOwnAction(action) && matchTarget(action)) {
      logger(`subscriber is processing action ${action.type}`);
      yield put({
        payload: action.payload,
        type: replaceType(action),
      });
    }
  }

  function* subscribe() {
    const subscribeHandler = yield call(registerSubscribe);
    const forever = true;
    try {
      while (forever) {
        const action = yield take(subscribeHandler);
        yield processAction(action);
      }
    } catch (err) {
      if (yield cancelled()) {
        subscribeHandler.close();
      } else {
        yield put({ type: errorActionType, err });
      }
    }
  }

  return function* startSagas() {
    yield [
      subscribe(),
    ];
  };
};

export default historySagasFactory;
