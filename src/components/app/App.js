import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Home from '../../pages/home/Home';
import List from '../../pages/list/List';
import Footer from '../footer/Footer';
import Details from '../../pages/details/Details';
import './App.scss';

function App() {
  const [page, setPage] = useState('home');

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

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      <div className="container">
        {routes.map(({ name, component: Component, renderIf }) => {
          if (page === name || (renderIf && renderIf(page))) {
            return <Component key={name} setPage={setPage} page={page} />;
          }
          return null;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
