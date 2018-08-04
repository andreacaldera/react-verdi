import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Basket from './components/Basket';
import Payment from './components/Payment';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <Route path="/checkout/basket" component={Basket} />
    <Route path="/checkout/payment" component={Payment} />
    <Route path="/*" component={NotFound} />
  </Route>
);

export default routes;
