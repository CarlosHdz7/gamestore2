import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import routes from '../../api/routes';
import useLocalStorage from '../../hooks/useLocalStorage';

function App() {
  const [page, setPage] = useState('home');
  const [storage] = useLocalStorage('user');
  const [isLogged, setIsLogged] = useState(false);

  // check if I am authenticated
  useEffect(() => {
    if (storage.username) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <div className="App">
      <Navbar setPage={setPage} isLogged={isLogged} />
      <div className="container">
        {routes.map(({ name, component: Component, renderIf }) => {
          if (page === name || (renderIf && renderIf(page))) {
            return (
              <Component
                key={name}
                setPage={setPage}
                page={page}
                isLogged={isLogged}
                setIsLogged={setIsLogged}
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
