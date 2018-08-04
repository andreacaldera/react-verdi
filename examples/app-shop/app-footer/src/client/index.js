import { clientManager } from 'react-verdi';

import Footer from '../common/components/Footer';
import { APP_CONTAINER_ID, APP_PATTERN, APP_NAME } from '../common/constants';

const { register } = clientManager({
  appName: APP_NAME,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
});

function getApp() {
  return Footer;
}

register({ getApp });
