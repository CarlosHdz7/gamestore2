/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Common.scss';
import '../../styles/Utilities.scss';
import './Navbar.scss';

const Navbar = ({ setPage }) => (
  <div className="navbar">
    <div className="d-flex">
      <div
        role="button"
        tabIndex="0"
        className="navbar-logo"
        onClick={() => setPage({ currentPage: 'home', id: 0 })}
      >
        GameStore
      </div>
    </div>
    <div className="navbar-options">
      <a
        href="/#"
        className="navbar-options__item"
        onClick={() => setPage({ currentPage: 'list', id: 0 })}
      >
        Store
      </a>
    </div>
  </div>
);

Navbar.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Navbar;
