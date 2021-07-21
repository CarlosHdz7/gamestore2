import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({ setPage, game }) => {
  const {
    id, name, price, urlImage,
  } = game;

  const redirectToDetails = () => {
    setPage({ currentPage: 'details', id });
  };

  const handleClick = () => {
    redirectToDetails();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div role="button" tabIndex="0" className="card" onClick={handleClick}>
      <div className="card-img-container">
        <img className="card-img" src={(urlImage) || '/images/controller.png'} alt="" />
      </div>
      <div className="card-info">
        <p className="card-info__title">{name}</p>
        <p className="card-info__subtitle">From</p>
        <p className="card-info__price">
          $
          {price}
        </p>
        <button
          className="card-info__button"
          type="button"
          onClick={(e) => e.stopPropagation()}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

Card.defaultProps = {
  game: {},
  setPage: () => {},
};

Card.propTypes = {
  game: PropTypes.instanceOf(Object),
  setPage: PropTypes.func,
};

export default Card;
