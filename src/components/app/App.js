import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import routes from '../../api/routes';
import './App.scss';

function App() {
  const [page, setPage] = useState('home');

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
