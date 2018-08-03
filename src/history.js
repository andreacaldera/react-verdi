import { createBrowserHistory } from "history";

if (window.__REACT_COMPOSER__ && window.__REACT_COMPOSER__.history) {
  console.log("FOUND HISTORY, USING THAT");
}

const history =
  (window.__REACT_COMPOSER__ && window.__REACT_COMPOSER__.history) ||
  createBrowserHistory({});

export default history;
