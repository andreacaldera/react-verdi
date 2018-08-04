import {
  publisherSagasFactory,
  subscriberSagasFactory,
  historySagasFactory,
  portalSagasFactory,
} from 'react-verdi';

import { APP_NAME } from '../common/constants';
import { NAMESPACE } from '../common/modules/constants';
import { ROUTE_CHANGED, ERROR } from '../common/modules/meta/constants';

export default function* rootSaga() {
  yield [
    historySagasFactory({
      appName: APP_NAME,
      routeChangedActionType: ROUTE_CHANGED,
      errorActionType: ERROR,
    })(),
    portalSagasFactory({
      routeChangedActionType: ROUTE_CHANGED,
    })(),
    subscriberSagasFactory({
      appName: APP_NAME,
      namespace: NAMESPACE,
      errorActionType: ERROR,
    })(),
    publisherSagasFactory()(),
  ];
}
