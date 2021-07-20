import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

const Home = ({ setPage }) => {
  return (
    <>
      <div className="home-container">
        <div className="container-info">
          <h4 className="container-info__title">Welcome to our store</h4>
          <p className="container-info__subtitle">
            Where you can find a lot of new titles of your favorites consoles
            everyday at good price.
          </p>
          <div className="button-container-home">
            <button
              type="button"
              className="container-info__button"
              onClick={() => setPage({ currentPage: 'list', id: 0 })}
            >
              Go to store
            </button>
          </div>
        </div>
        <div className="container-image">
          <img
            className="container-image__img"
            src="/images/controller.png"
            alt="img-homepage"
          ></img>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Home;