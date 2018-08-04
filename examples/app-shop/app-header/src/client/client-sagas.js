import {
  historySagasFactory,
  publisherSagasFactory,
  subscriberSagasFactory,
} from 'react-verdi';

import { APP_NAME } from '../common/constants';
import { NAMESPACE, ERROR, ROUTE_CHANGED } from '../common/modules/constants';

export default function* clientSaga() {
  yield [
    historySagasFactory({
      appName: APP_NAME,
      routeChangedActionType: ROUTE_CHANGED,
      errorActionType: ERROR,
    })(),
    publisherSagasFactory()(),
    subscriberSagasFactory({
      appName: APP_NAME,
      namespace: NAMESPACE,
      errorActionType: ERROR,
    })(),
  ];
}
