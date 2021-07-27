import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Helpers from '../../api/helpers';
import Loader from '../../components/loader';
import Comments from '../../components/comments';
import useFetchGame from '../../hooks/useFetchGame';
import useFetchComments from '../../hooks/useFetchComments';

import './Details.scss';

// eslint-disable-next-line react/prop-types
const Details = ({ page, setPage, user }) => {
  const id = page.split('/')[1];
  const [inputComment, setInputComment] = useState('');
  const { apiData: game, isLoading, serverError } = useFetchGame(id);
  const {
    apiData: comments, isLoading: isLoadingComments, serverError: serverErrorComments, getComments,
  } = useFetchComments(id);

  const postComment = async () => {
    try {
      if (!inputComment && !inputComment.length > 100) return;

      const comment = {
        body: inputComment,
      };

      const headers = {
        Authorization: `Bearer ${user.jwt}`,
      };

      await Helpers.postComment(id, comment, headers);
      setInputComment('');
      getComments();
    } catch (error) {
      setPage('login');
    }
  };

  const handleInputChange = useCallback((e) => {
    setInputComment(e.target.value);
  }, [id]);

  const handleBackClick = useCallback(() => {
    setPage('list');
  }, [id]);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className='button-container'>
        <button
          type='button'
          className='button-container__button'
          onClick={handleBackClick}
        >
          <i className='button-container__icon bi bi-arrow-left-circle-fill' />
          Back
        </button>
      </div>

      {isLoading && <Loader />}

      { (!isLoading && !serverError) ? (
        <>
          <div className='details-container'>
            <div className='container-img-cover'>
              <img
                className='container-img-cover__img'
                src={game.urlImage ? game.urlImage : '/images/not-found.png'}
                alt=''
              />
            </div>
            <div className='info-container'>
              <p className='info-container__text info-container__text--name'>
                {game.name}
              </p>
              <p className='info-container__text'>
                Genre:
                {game.genre}
              </p>
              <p className='info-container__text'>
                Release:
                {game.releaseYear}
              </p>
              <p className='info-container__text'>
                Price:
                $
                {game.price}
              </p>
              <button type='button' className='info-container__button'>
                Buy now
              </button>
            </div>
          </div>

          {user && (
          <>
            <p className='comments-container__title'>Write a comment:</p>
            <textarea
              className='comments-container__textarea'
              value={inputComment}
              onChange={handleInputChange}
            />
            <div className='comments-container-button'>
              <button
                type='button'
                className='comment-button'
                onClick={postComment}
              >
                Comment
              </button>
            </div>
          </>
          )}

          {!user && (
          <>
            <p className='login-message'>You must be logged to post comment</p>
          </>
          )}
        </>
      ) : (
        <p>{serverError}</p>
      )}

      <div className='comments-container'>
        <p className='comments-container__title'>Comments:</p>

        {isLoadingComments && <Loader />}

        { (!isLoadingComments && !serverErrorComments) ? (
          <Comments comments={comments} />
        ) : (
          <p>{serverErrorComments}</p>
        )}
      </div>
    </>
  );
};

Details.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Details;
