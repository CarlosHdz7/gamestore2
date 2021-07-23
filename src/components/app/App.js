import React, { useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import routes from '../../api/routes';
import useAuth from '../../hooks/useAuth';

function App() {
  const [page, setPage] = useState('home');
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="App">
      <Navbar setPage={setPage} isAuthenticated={isAuthenticated} logout={logout} />
      <div className="container">
        {routes.map(({ name, component: Component, renderIf }) => {
          if (page === name || (renderIf && renderIf(page))) {
            return (
              <Component
                key={name}
                setPage={setPage}
                page={page}
                login={login}
                isAuthenticated={isAuthenticated}
              />
            );
          }
          return null;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
