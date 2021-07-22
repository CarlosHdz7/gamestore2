import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import useLocalStorageState from '../../hooks/useLocalStorage';
import './Login.scss';
import Helpers from '../../api/helpers';

function Login({ setPage }) {
  const helpers = new Helpers();
  const inputUser = useRef();
  const inputPassword = useRef();

  const [, setStorage] = useLocalStorageState('user');

  const login = useCallback(async (credentials) => {
    const userInfo = await helpers.postLogin(credentials);
    setStorage(userInfo);
    setPage('list');
  });

  const handleClick = () => {
    const credentials = {
      identifier: inputUser.current.value,
      password: inputPassword.current.value,
    };

    login(credentials);
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
