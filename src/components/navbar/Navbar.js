/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Common.scss';
import '../../styles/Utilities.scss';
import './Navbar.scss';

// eslint-disable-next-line react/prop-types
const Navbar = ({ setPage, user, logout }) => {
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
  };

  return (
    <div className="navbar">
      <div className="d-flex">
        <button
          type="button"
          className="navbar-logo"
          onClick={redirectToHomePage}
        >
          GameStore
        </button>
      </div>
      <div className="navbar-options">
        <a
          href="/#"
          className="navbar-options__item"
          onClick={redirectToStore}
        >
          Store
        </a>
        {user && (
          <a
            href="/#"
            className="navbar-options__item"
            onClick={handleLogout}
          >
            Logout
          </a>
        )}
        {!user && (
          <a
            href="/#"
            className="navbar-options__item"
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
