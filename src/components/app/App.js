import React, { useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import routes from '../../api/routes';
import useAuth from '../../hooks/useAuth';
// import useLocalStorage from '../../hooks/useLocalStorage';

function App() {
  const [page, setPage] = useState('home');
  // const [storage] = useLocalStorage('user');
  // const [isLogged, setIsLogged] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  // check if I am authenticated
  // useEffect(() => {
  //   if (storage.username) {
  //     setIsLogged(true);
  //   } else {
  //     setIsLogged(false);
  //   }
  // }, []);

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
