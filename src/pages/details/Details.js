import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../api/helpers';
import Loader from '../../components/loader';
import Comments from '../../components/comments';
import './Details.scss';

const helpers = new Helpers();

const Details = ({ page, setPage }) => {
  const [game, setGame] = useState({});
  const [inputComment, setInputComment] = useState('');
  const [loadingGame, setLoadingGame] = useState(false);
  const id = page.split('/')[1];

  const postComment = useCallback(async () => {
    try {
      const comment = {
        gameId: id,
        comment: inputComment,
      };

      helpers.postComment(comment).then(() => {
        setInputComment('');
      });
    } catch (error) {
      setPage({ currentPage: 'list', id: 0 });
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputComment(e.target.value);
  }, []);

  const handleBackClick = useCallback(() => {
    setPage('list');
  }, []);

  useEffect(() => {
    const fetchGameById = async () => {
      try {
        setLoadingGame(true);
        const data = await helpers.getGameById(id);
        setGame(data);
        setLoadingGame(false);
      } catch (error) {
        setPage({ currentPage: 'list', id: 0 });
      }
    };

    fetchGameById();
  }, [id, setPage]);

  return (
    <>
      <div className="button-container">
        <button
          type="button"
          className="button-container__button"
          onClick={handleBackClick}
        >
          <i className="button-container__icon bi bi-arrow-left-circle-fill" />
          Back
        </button>
      </div>

      {loadingGame && <Loader />}

      {!loadingGame && (
        <>
          <div className="details-container">
            <div className="container-img-cover">
              <img className="container-img-cover__img" src={game.urlImage ? game.urlImage : '/images/controller.png'} alt="" />
            </div>
            <div className="info-container">
              <p className="info-container__text info-container__text--name">{game.name}</p>
              <p className="info-container__text">
                Genre:
                {game.genre}
              </p>
              <p className="info-container__text">
                Release:
                {game.releaseYear}
              </p>
              <p className="info-container__text">
                Price:
                {game.price}
                $
              </p>
              <button type="button" className="info-container__button">Buy now</button>
            </div>
          </div>
          <div className="comments-container">
            <p className="comments-container__title">Write a comment:</p>
            <textarea
              className="comments-container__textarea"
              value={inputComment}
              onChange={handleInputChange}
            />
            <div className="comments-container-button">
              <button
                type="button"
                className="comment-button"
                onClick={postComment}
              >
                Comment
              </button>
            </div>
            <p className="comments-container__title">Comments:</p>

            <Comments comments={game.comments} />
          </div>
        </>
      )}
    </>
  );
};

Details.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Details;
