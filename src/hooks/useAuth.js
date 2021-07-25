import { useState } from 'react';
import Helpers from '../api/helpers';
import LocalStorage from '../api/localStorage';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const userInfo = await Helpers.postLogin(credentials);
    LocalStorage.save('user', userInfo);
    setUser(userInfo);
  };

  const logout = async () => {
    LocalStorage.save('user', {});
    setUser(false);
  };

  return { user, login, logout };
};

export default useAuth;
