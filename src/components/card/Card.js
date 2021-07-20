import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({ setPage, game }) => {
  const { id, image, title, price } = game;

  const redirectToDetails = () => {
    setPage({ currentPage: 'details', id: id });
  };

  return (
    <div className="card" onClick={setPage && redirectToDetails}>
      <div className="card-img-container">
        <img className="card-img" src={image} alt=""></img>
      </div>
      <div className="card-info">
        <p className="card-info__title">{title}</p>
        <p className="card-info__subtitle">From</p>
        <p className="card-info__price">{price}</p>
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

Card.propTypes = {
  game: PropTypes.object.isRequired,
  setPage: PropTypes.func,
};

export default Card;
