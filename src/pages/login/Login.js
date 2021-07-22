import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import useLocalStorageState from '../../hooks/useLocalStorage';

function Login({ setPage }) {
  const [user] = useLocalStorageState('user');

  useEffect(() => {
    if (user.token !== undefined) {
      setPage('home');
    }
  }, []);

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <p>User</p>
        <input type="text" placeholder="user" />
        <p>Password</p>
        <input type="text" placeholder="user" />
        <button className="login-container__button" type="button">Log</button>
      </div>
    </>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login;
