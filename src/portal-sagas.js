import { takeLatest } from 'redux-saga/effects';

const portalSagasFactory = ({ routeChangedActionType }) => {
  function refreshApps({ payload: pathname }) {
    const apps = Object.values(window.__REACT_COMPOSER__.apps);
    return Promise.all(apps.map((app) => app.isActive(pathname)
      ? app.mount(pathname)
      : app.unmount()));
  }

  function* routeListener() {
    yield takeLatest(routeChangedActionType, refreshApps);
  }
  return function* startSagas() {
    yield [
      routeListener(),
    ];
  };
};

export default portalSagasFactory;
