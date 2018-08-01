import UrlPatter from 'url-pattern';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import loggerFactory from './logger';
import history from './history';

const clientManager = ({
  appName,
  reduxStateId,
  pattern,
  appContainerId,
}) => {
  const logger = loggerFactory(appName);

  logger(`react version: $${React.version}`);

  const appPattern = new UrlPatter(pattern);

  const domElement = document.getElementById(appContainerId);

  const isActive = (location = window.location.pathname) =>
    Boolean(appPattern.match(location));

  const appManager = {
    initialised: false,
    isActive: false,
  };

  window.__REACT_COMPOSER__ = window.__REACT_COMPOSER__ || {
    publish: () => {},
    subscribe: () => {},
    apps: {},
  };

  const register = ({
    getApp,
    configureApp = () => {},
    fetchData = () => Promise.resolve(),
  }) => {
    const initialiseApp = (state) => {
      logger('initialise');
      configureApp(state);
      appManager.initialised = true;
    };

    function renderApp() {
      const App = getApp();
      App.displayName = appName;
      render(<App />, domElement);
    }

    function mount() {
      if (!isActive()) {
        logger('not mounting: inactive');
        return;
      }
      if (appManager.isActive) {
        return;
      }
      logger('mount');
      appManager.isActive = true;
      return Promise.resolve().then(() => {
        if (appManager.initialised) {
          logger('already initialised');
          return renderApp();
        }
        fetchData()
          .then((state) => {
            initialiseApp(state);
            return renderApp();
          })
          .then(() => {
            // TODO do I need this?
            // history.replace(window.location);
          });
      });
    }

    function unmount() {
      logger('unmmount');
      appManager.isActive = false;
      unmountComponentAtNode(domElement);
    }

    window.__REACT_COMPOSER__.apps = Object.assign({}, window.__REACT_COMPOSER__.apps, {
      [appName]: {
        mount,
        unmount,
        isActive,
      },
    });

    if (reduxStateId && window[reduxStateId]) {
      initialiseApp(window[reduxStateId]);
    }

    mount();
  };

  return Object.freeze({
    register,
    history: window.__REACT_COMPOSER__.history || history,
    appManager,
  });
};

export default clientManager;
