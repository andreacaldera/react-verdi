# react-verdi

Composer for React applications.

Enable composition of different React applications within the same page.

As for instruments in an orchestra, single applications can be played individually or play in an orchestra alongside the rest of the applications.

## Features

### Server side rendering

Applications can be rendered server side individually (standalone mode) and when aggregated within a portal. Each application is responsible for its own server side rendering whereas the portal is responsible for aggregating them.

In order to render an host app server side, the portal app should fetch the host app HTML server side and include the host app JS and CSS.

```
<!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="PORTAL_APP.css" />
        <link rel="stylesheet" type="text/css" href="CLIENT_APP.css" />
      <title>PORTAL APP</title>
      </head>
      <body>
        <div id="PORTAL_APP_CONTAINER_ID">
          This is the content of the portal app
        </div>
        <div id=HOST_APP_CONTAINER_ID">
            <script>window.__APP_HOST_INITIAL_STATE__ = {}</script>
        </div>
        <script>window.__PORTAL_APP_INITIAL_STATE__ = {}</script>
        <script src="PORTAL_APP.js"></script>
        <script src="HOST_APP.js"></script>
      </body>
    </html>
```

An example of this is available in [app-shop server](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-shop/src/server/server.js)

### Vanilla React 16

If your application is implemented in vanilla React 16, add the following to your client file.

In order to include a host app within a port app, the following is required in the host app client JS.
```
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
```

The parameters passed to __react-verdi__ are:
- _APP_PATTERN_ will be used by __react-verdi__ to know if the host app needs to mounted / unmounted for a particula URL.
- _APP_CONTAINER_ID_ will be used by __react-verdi__ to mount the host app to the its DOM element.

An example of this is available in [app-footer client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-footer/src/client/index.js)

### React 16, Redux, and React Router

If your application is using React 16, Redux, and React Router, add the following to your client file.

[app-product client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-product/src/client/index.js)

### React 15, Redux, and React Router

If your application is using React 15, Redux, and React Router, add the following to your client file.

[app-checkout client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-checkout/src/client/index.js)

## Examples

### app-shop

An ecommerce application comprising of a portal app (**app-shop**) and four different host applications: **app-product**, **app-checkout**, **app-footer**, **app-header**.

[app-shop live demo](https://react-verdi-demo-app-shop.herokuapp.com/) (Hosted on free Heroku, subject to sleep time after inactivity)

[more information](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/README.md)
