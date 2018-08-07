# react-verdi

**This project is in incubation. Stay tuned for a more polished version very soon!**

Composer for React applications.

Enable composition of different React applications within the same page.

As for instruments in an orchestra, single applications can be played individually or play in an orchestra alongside the rest of the applications.

## Features

### Server side rendering

Applications can be rendered server side individually (standalone mode) and when aggregated within a portal. Each application is responsible for its own server side rendering whereas the portal is responsible for aggregating them. An example of this is available in [app-shop server](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-shop/src/server/server.js)

### Plain React 16

If your application is implemented in plain React 16, add the following to your client file.

[app-footer client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-footer/src/client/index.js)

[app-product client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-product/src/client/index.js)

### React 16, Redux, and React Router

If your application is using React 16, Redux, and React Router, add the following to your client file.

### React 15, Redux, and React Router

If your application is using React 15, Redux, and React Router, add the following to your client file.

[app-product client](https://github.com/andreacaldera/react-verdi/blob/master/examples/app-shop/app-checkout/src/client/index.js)

## Examples

### Shop application

[app-shop](examples/app-shop/README.md)
