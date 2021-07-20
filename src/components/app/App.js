import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Home from '../../pages/home/Home';
import List from '../../pages/list/List';
import Footer from '../footer/Footer';
import Details from '../../pages/details/Details';
import './App.scss';

function App() {
  const [page, setPage] = useState({ currentPage: 'home', id: 0 });

  return (
    <div className="App">
      <div className="navbar-container">
        <Navbar setPage={setPage} />
      </div>

      <div className="container">
        {page.currentPage === 'home' && <Home setPage={setPage} />}
        {page.currentPage === 'list' && <List setPage={setPage} />}
        {page.currentPage === 'details' && (
          <Details id={page.id} setPage={setPage} />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
