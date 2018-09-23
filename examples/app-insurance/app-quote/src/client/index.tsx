// import { clientManager } from 'react-verdi';

// import Quote from '../common/components/Quote';
// import { APP_CONTAINER_ID, APP_PATTERN, APP_NAME } from '../common/constants';

// const { register } = clientManager({
//   appName: APP_NAME,
//   pattern: APP_PATTERN,
//   appContainerId: APP_CONTAINER_ID,
// });

// function getApp() {
//   return Quote;
// }

// register({ getApp });


import * as React from "react";
import * as ReactDOM from "react-dom";

import { Quote } from '../common/components/Quote';

ReactDOM.render(
    <Quote compiler="TypeScript" framework="React" />,
    document.getElementById("app-quote")
);
