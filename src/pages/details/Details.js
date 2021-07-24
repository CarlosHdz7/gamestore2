import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../api/helpers';
import Loader from '../../components/loader';
import Comments from '../../components/comments';
import useFetchGame from '../../hooks/useFetchGame';
import LocalStorage from '../../api/localStorage';
// import useLocalStorage from '../../hooks/useLocalStorage';
import './Details.scss';

const helpers = new Helpers();

// eslint-disable-next-line react/prop-types
const Details = ({ page, setPage, user }) => {
  const [inputComment, setInputComment] = useState('');
  // const [storage] = useLocalStorage('user');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const id = page.split('/')[1];
  const { data: game, loading } = useFetchGame(id);

  const fetchCommentsByGame = useCallback(async () => {
    try {
      setLoadingComments(true);
      const data = await helpers.getCommentsByGame(id);
      setComments(data);
      setLoadingComments(false);
    } catch (error) {
      setPage('home');
    }
  }, [id]);

  useEffect(() => {
    fetchCommentsByGame();
  }, [fetchCommentsByGame]);

  const postComment = async () => {
    try {
      if (!inputComment) return;

      const storage = await LocalStorage.read('user');

      const comment = {
        body: inputComment,
      };

      const headers = {
        Authorization: `Bearer ${storage.jwt}`,
      };

      helpers.postComment(id, comment, headers).then(() => {
        setInputComment('');
        fetchCommentsByGame();
      });
    } catch (error) {
      setPage('list');
    }
  };

  const handleInputChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleBackClick = useCallback(() => {
    setPage('list');
  }, [id]);

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

      {loading && <Loader />}

      {!loading && (
        <>
          <div className='details-container'>
            <div className='container-img-cover'>
              <img
                className='container-img-cover__img'
                src={game.urlImage ? game.urlImage : '/images/controller.png'}
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
                {game.price}
                $
              </p>
              <button type='button' className='info-container__button'>
                Buy now
              </button>
            </div>
          </div>
        </>
      )}
      <div className='comments-container'>
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

        <p className='comments-container__title'>Comments:</p>

        {loadingComments && <Loader />}

        {!loadingComments && <Comments comments={comments} />}
      </div>
    </>
  );
};

Details.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Details;
