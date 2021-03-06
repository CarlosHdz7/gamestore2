import React, {
  useRef, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import './Login.scss';

// eslint-disable-next-line react/prop-types
function Login({ setPage, user, login }) {
  const inputUser = useRef();
  const inputPassword = useRef();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) {
      setPage('list');
    }
  }, []);

  const loginUser = async () => {
    const credentials = {
      identifier: inputUser.current.value,
      password: inputPassword.current.value,
    };

    try {
      await login(credentials);
      setPage('list');
    } catch (e) {
      setError(true);
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='login-container__Welcome'>
          <h1>Hi! It’s nice to see you!</h1>
        </div>
        <div className='login-container__form'>
          <h1 className='form__title'>
            <i className='bi bi-person-circle' />
            {' '}
            Welcome
          </h1>
          <p>User</p>
          <input
            type='text'
            placeholder='Ex. john-doe'
            ref={inputUser}
            className='form__input'
            maxLength='30'
          />
          <p>Password</p>
          <input
            type='password'
            placeholder='Ex. john123'
            ref={inputPassword}
            className='form__input'
            maxLength='30'
          />
          {error && <p className='error-message'>Invalid user or email</p>}
          <button className='form__button' type='button' onClick={loginUser}>
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
