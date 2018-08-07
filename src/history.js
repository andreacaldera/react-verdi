import { createBrowserHistory } from 'history';

export default ({ logger }) => {
  const reactVerdiHistory =
    typeof window !== 'undefined' &&
    window.__REACT_COMPOSER__ &&
    window.__REACT_COMPOSER__.history;
  if (reactVerdiHistory) {
    logger('History is already present, using that');
    return reactVerdiHistory;
  }

  logger('Creating new history');
  return createBrowserHistory({});
};
