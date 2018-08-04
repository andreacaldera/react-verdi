import App from './components/App';
import Products from './components/Products';
import Product from './components/Product';

const routes = [
  {
    component: App,
    routes: [
      { path: '/products/*', component: Product },
      { path: '/products', component: Products },
    ],
  },
];

export default routes;
