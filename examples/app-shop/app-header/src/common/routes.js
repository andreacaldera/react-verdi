import App from './components/App';
import TopNav from './components/TopNav';

const routes = [
  {
    component: App,
    routes: [
      { path: '*', component: TopNav },
    ],
  },
];

export default routes;
