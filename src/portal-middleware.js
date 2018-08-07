import historyFactory from './history';

const reactVerdiMiddleware = ({ logger, routeChangedActionType }) => {
  return () => {
    logger('Initialising portal middleware');

    const refreshApp = (app, pathname) =>
      app.isActive(pathname) ? app.mount(pathname) : app.unmount();

    const refreshApps = ({ payload: pathname }) => {
      const apps = Object.values(window.__REACT_COMPOSER__.apps);
      return Promise.all(apps.map((app) => refreshApp(app, pathname)));
    };

    return (next) => (action) => {
      next(action);
      if (action.type === routeChangedActionType) {
        logger('Route changed, refreshing apps');
        refreshApps(action);
      }
    };
  };
};

export default reactVerdiMiddleware;
