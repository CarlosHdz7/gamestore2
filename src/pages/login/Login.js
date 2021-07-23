import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';
import './Login.scss';
import Helpers from '../../api/helpers';

function Login({ setPage }) {
  const helpers = new Helpers();
  const inputUser = useRef();
  const inputPassword = useRef();
  const [, setStorage] = useLocalStorage('user');

  const [storage] = useLocalStorage('user');

  // check if I am authenticated
  useEffect(() => {
    if (storage.username) {
      setPage('list');
    }
  }, []);

  const login = useCallback(async () => {
    const credentials = {
      identifier: inputUser.current.value,
      password: inputPassword.current.value,
    };

    const userInfo = await helpers.postLogin(credentials);
    setStorage(userInfo);
    setPage('list');
  });

  const handleClick = () => {
    login();
  };

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <p>User</p>
        <input type="text" placeholder="user" ref={inputUser} />
        <p>Password</p>
        <input type="text" placeholder="password" ref={inputPassword} />
        <button
          className="login-container__button"
          type="button"
          onClick={handleClick}
        >
          Log
        </button>
      </div>
    </>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login;
