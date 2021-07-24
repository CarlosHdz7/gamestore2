import React, {
  useCallback, useRef, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import Helpers from '../../api/helpers';

function Login({ setPage, isAuthenticated, login }) {
  const helpers = new Helpers();
  const inputUser = useRef();
  const inputPassword = useRef();
  const [error, setError] = useState(false);

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

    try {
      const userInfo = await helpers.postLogin(credentials);
      login(userInfo);
      setPage('list');
    } catch (e) {
      setError(true);
    }
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
          <input type="password" placeholder="password" ref={inputPassword} className="form__input" />
          {error && (
            <p>Invalid user or email</p>
          )}
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
