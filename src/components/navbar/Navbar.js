/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import usePrevious from '../../hooks/usePrevious';

import '../../styles/Common.scss';
import '../../styles/Utilities.scss';
import './Navbar.scss';

// eslint-disable-next-line react/prop-types
const Navbar = ({ setPage, user, logout }) => {
  const [containerState, setContainerState] = useState(true);
  const prevState = usePrevious(containerState);
  const containerRef = useRef();

  const redirectToHomePage = () => {
    setPage('home');
  };

  const redirectToStore = () => {
    setPage('list');
  };

  const redirectToLogin = () => {
    setPage('login');
  };

  const handleLogout = () => {
    logout();
    setPage('home');
    setContainerState(false);
  };

  useEffect(() => {
    if (!prevState) {
      containerRef.current?.classList.add('d-none');
    } else {
      containerRef.current?.classList.remove('d-none');
    }
  }, [containerState]);

  const handleShowLogout = () => {
    if (!containerState) {
      setContainerState(true);
    } else {
      setContainerState(false);
    }
  };

  return (
    <div className='navbar'>
      <div className='d-flex'>
        <button
          type='button'
          className='navbar-logo'
          onClick={redirectToHomePage}
        >
          GameStore
        </button>
      </div>
      <div className='navbar-options'>
        <a
          href='/#'
          className='navbar-options__item'
          onClick={redirectToStore}
        >
          <i className='bi bi-cart-fill' />
          {' '}
          Store
        </a>
        {user && (
          <div className='userSession'>
            <button
              type='button'
              className='navbar-options__item--button'
              onClick={handleShowLogout}
            >
              {user.username}
            </button>
            <div className='logout-button-container d-none' ref={containerRef}>
              <a
                href='/#'
                className='navbar-options__item logout-button'
                onClick={handleLogout}
              >
                <i className='bi bi-door-open-fill' />
                {' '}
                Logout
              </a>
            </div>
          </div>
        )}
        {!user && (
          <a
            href='/#'
            className='navbar-options__item'
            onClick={redirectToLogin}
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setPage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
