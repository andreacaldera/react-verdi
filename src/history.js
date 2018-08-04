import { createBrowserHistory } from "history";

const history =
  (window.__REACT_COMPOSER__ && window.__REACT_COMPOSER__.history) ||
  createBrowserHistory({});

export default history;
