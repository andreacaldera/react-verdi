import { eventChannel } from 'redux-saga';
import {
  put,
  call,
  cancelled,
  take,
} from 'redux-saga/effects';

import history from './history';
import loggerFactory from './logger';

const historySagasFactory = ({
  appName,
  routeChangedActionType,
  errorActionType,
}) => {
  const logger = loggerFactory(appName);

  function registerHistoryListener() {
    return eventChannel((emitter) => {
      (window.__REACT_COMPOSER__.history || history).listen(({ pathname }) => {
        logger(`history listener detected change ${history.location.pathname}`);
        emitter({ pathname });
      });
      const unsubscribe = () => {};
      return unsubscribe;
    });
  }

  function* historyListener() {
    const subscribeHandler = yield call(registerHistoryListener);
    const forever = true;
    try {
      while (forever) {
        const { pathname } = yield take(subscribeHandler);
        logger(`last detected route ${pathname}`);
        const action = {
          debug: `${appName}-history-listener`,
          type: routeChangedActionType,
          payload: pathname,
        };
        yield put(action);
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
      historyListener(),
    ];
  };
};

export default historySagasFactory;
