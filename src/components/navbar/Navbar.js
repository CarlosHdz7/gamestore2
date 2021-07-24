/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Common.scss';
import '../../styles/Utilities.scss';
import './Navbar.scss';

// eslint-disable-next-line react/prop-types
const Navbar = ({ setPage, user, logout }) => (
  <div className="navbar">
    <div className="d-flex">
      <div
        role="button"
        tabIndex="0"
        className="navbar-logo"
        onClick={() => setPage('home')}
      >
        GameStore
      </div>
    </div>
    <div className="navbar-options">
      <a
        href="/#"
        className="navbar-options__item"
        onClick={() => setPage('list')}
      >
        Store
      </a>

      {user && (
        <a
          href="/#"
          className="navbar-options__item"
          onClick={() => logout()}
        >
          Logout
        </a>
      )}
      {!user && (
        <a
          href="/#"
          className="navbar-options__item"
          onClick={() => setPage('login')}
        >
          Login
        </a>
      )}
    </div>
  </div>
);

Navbar.propTypes = {
  setPage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
