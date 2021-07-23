import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import useLocalStorage from '../../hooks/useLocalStorage';
import './Login.scss';
import Helpers from '../../api/helpers';

function Login({ setPage, isAuthenticated, login }) {
  const helpers = new Helpers();
  const inputUser = useRef();
  const inputPassword = useRef();
  // const [, setStorage] = useLocalStorage('user');

  // const [storage] = useLocalStorage('user');

  // check if I am authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      setPage('list');
    }
  }, []);

  const loginUser = useCallback(async () => {
    const credentials = {
      identifier: inputUser.current.value,
      password: inputPassword.current.value,
    };

    const userInfo = await helpers.postLogin(credentials);
    login(userInfo);
    setPage('list');
  });

  const handleClick = () => {
    loginUser();
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container__Welcome">
          <h1>Welcome</h1>
        </div>
        <div className="login-container__form">
          <h1 className="form__title">Login</h1>
          <p>User</p>
          <input type="text" placeholder="user" ref={inputUser} className="form__input" />
          <p>Password</p>
          <input type="text" placeholder="password" ref={inputPassword} className="form__input" />
          <button
            className="form__button"
            type="button"
            onClick={handleClick}
          >
            Log
          </button>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
