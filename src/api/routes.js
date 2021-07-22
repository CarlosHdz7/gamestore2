import Home from '../pages/home';
import List from '../pages/list';
import Details from '../pages/details';

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
    name: 'details',
    component: Details,
    renderIf: (currentPage) => currentPage.toString().indexOf('details/') !== -1,
  },
];

export default routes;
