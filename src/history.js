import { createBrowserHistory } from 'history';

export default ({ logger }) => {
  const reactVerdiHistory = window.__REACT_COMPOSER__ && window.__REACT_COMPOSER__.history;
  if (reactVerdiHistory) {
    logger && logger('History is already present, using that');
    return reactVerdiHistory;
  }

  logger && logger('Creating new history');
  return createBrowserHistory({});
};
