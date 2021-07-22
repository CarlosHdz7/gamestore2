import Home from '../pages/home/Home';
import List from '../pages/list/List';
import Details from '../pages/details/Details';

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
