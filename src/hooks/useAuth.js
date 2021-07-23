import { useState, useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [storage, setStorage] = useLocalStorage('user');
  const [isLogged, setIsLogged] = useState(false);

  const isAuthenticated = useCallback(
    () => {
      if (Object.keys(storage).length) {
        return true;
      }
      return false;
    },
  );

  const login = (data) => {
    setStorage(data);
    setIsLogged(true);
  };

  const logout = () => {
    setStorage({});
    setIsLogged(false);
  };

  useEffect(() => {
    isAuthenticated();
  }, [isLogged]);

  return { isAuthenticated, login, logout };
};

export default useAuth;
