import clientManager from './client-manager';
import portalManager from './portal-manager';
import loggerFactory from './logger';
import historySagasFactory from './history-sagas';
import publisherSagasFactory from './publisher-sagas';
import portalSagasFactory from './portal-sagas';
import subscriberSagasFactory from './subscriber-sagas';

export default {
  clientManager,
  portalManager,
  loggerFactory,
  historySagasFactory,
  publisherSagasFactory,
  subscriberSagasFactory,
  portalSagasFactory,
};
