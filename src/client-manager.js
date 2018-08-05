import UrlPatter from 'url-pattern';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import loggerFactory from './logger';
import history from './history';

const clientManager = ({ appName, reduxStateId, pattern, appContainerId, lazyLoading = true }) => {
  const logger = loggerFactory(appName);

  const appPattern = new UrlPatter(pattern);

  const domElement = document.getElementById(appContainerId);

  const isActive = (location = window.location.pathname) => {
    const result = Boolean(appPattern.match(location));
    logger('Is app active on path', location, '? ', result);
    return result;
  };

  const appManager = {
    initialised: false,
    isActive: false,
  };

  window.__REACT_COMPOSER__ = window.__REACT_COMPOSER__ || {
    publish: () => {},
    subscribe: () => {},
    apps: {},
  };

  const register = ({ getApp, configureApp = () => {}, fetchData = () => Promise.resolve() }) => {
    const initialiseApp = (state) => {
      logger('initialising');
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
        logger('Not mounting: inactive');
        return;
      }
      if (appManager.isActive) {
        return;
      }
      logger('mounting');
      appManager.isActive = true;
      return Promise.resolve().then(() => {
        if (appManager.initialised) {
          logger('Already initialised, just rendering');
          return renderApp();
        }
        fetchData().then((state) => {
          logger('Initialising');
          initialiseApp(state);
          return renderApp();
        });
      });
    }

    function unmount() {
      logger('Unmmounting');
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

    if (!lazyLoading || window[reduxStateId]) {
      logger(
        'Initialising app: lazy loading',
        lazyLoading,
        ', static state',
        Boolean(window[reduxStateId])
      );
      initialiseApp(window[reduxStateId]);
    }

    mount();
  };

  return Object.freeze({
    register,
    history,
    appManager,
    logger,
  });
};

export default clientManager;
