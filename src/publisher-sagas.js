import { takeEvery } from 'redux-saga/effects';

const historySagasFactory = () => {
  function* publishAction() {
    yield takeEvery('*', (action) => {
      if (action.publish) {
        window.__REACT_COMPOSER__.publish(action);
      }
    });
  }

  return function* startSagas() {
    yield [
      publishAction(),
    ];
  };
};

export default historySagasFactory;
