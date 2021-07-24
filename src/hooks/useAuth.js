import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [storage, setStorage] = useLocalStorage('user');

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
  };

  const logout = () => {
    setStorage({});
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
