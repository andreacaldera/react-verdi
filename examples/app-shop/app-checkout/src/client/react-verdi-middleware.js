import { NAMESPACE } from '../common/modules/constants';

// TOODO replace with logger

const namespace = NAMESPACE;

const isOwnAction = ({ type }) => type.startsWith(namespace);

const matchTarget = ({ target }) => !target || target === namespace;

const replaceType = ({ type }) =>
  `${namespace}/${type.substring(type.indexOf('/') + 1)}`;

export default (store) => {
  console.log('init middleware');
  const actionSubscriber = (action) => {
    console.log('got action', action);
    if (!isOwnAction(action) && matchTarget(action)) {
      console.log(`subscriber is processing action ${action.type}`);
      store.dispatch({
        payload: action.payload,
        type: replaceType(action),
      });
    }
  };
  window.__REACT_COMPOSER__.subscribe(actionSubscriber);

  return (next) => (action) => {
    next(action);
    if (action.publish) {
      window.__REACT_COMPOSER__.publish(action);
    }
  };
};
