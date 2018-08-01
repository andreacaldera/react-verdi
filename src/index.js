import clientManager from './client-manager';
import portalManager from './portal-manager';
import loggerFactory from './logger';
import history from './history';
import historySagasFactory from './history-sagas';
import publisherSagasFactory from './publisher-sagas';
import portalSagasFactory from './portal-sagas';
import subscriberSagasFactory from './subscriber-sagas';

export default {
  clientManager,
  portalManager,
  loggerFactory,
  history,
  historySagasFactory,
  publisherSagasFactory,
  subscriberSagasFactory,
  portalSagasFactory,
};
