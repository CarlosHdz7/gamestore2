/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ({ setPage, game }) => {
  const {
    id, name, price, urlImage,
  } = game;

  const redirectToDetails = useCallback(() => {
    setPage(`details/${id}`);
  }, [id]);

  return (
    <a
      role='button'
      tabIndex='0'
      className='card'
      onClick={redirectToDetails}
    >
      <div className='card-img-container'>
        <img
          className='card-img'
          src={urlImage || '/images/not-found.png'}
          alt=''
        />
      </div>
      <div className='card-info'>
        <p className='card-info__title'>{name}</p>
        <p className='card-info__subtitle'>From</p>
        <p className='card-info__price'>
          $
          {price}
        </p>
        <button
          className='card-info__button'
          type='button'
          onClick={(e) => e.stopPropagation()}
        >
          Buy now
        </button>
      </div>
    </a>
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
