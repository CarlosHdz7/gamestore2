import Home from '../pages/home';
import List from '../pages/list';
import Details from '../pages/details';
import login from '../pages/login';

const routes = [
  {
    name: 'home',
    component: Home,
  },
  {
    name: 'list',
    component: List,
  },
  {
    name: 'login',
    component: login,
  },
  {
    name: 'details',
    component: Details,
    renderIf: (currentPage) => currentPage.toString().indexOf('details/') !== -1,
  },
];

export default routes;
