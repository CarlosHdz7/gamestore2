import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card.js';
import Helpers from '../../api/helpers.js';
import Loader from '../../components/loader/Loader.js';
import Comments from '../../components/comments/Comments.js';
import './Details.scss';

const helpers = new Helpers();

const Details = ({ id, setPage }) => {
  const [game, setGame] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);

  const fetchCommentsByGame = useCallback(async () => {
    try {
      setLoadingComments(true);
      const data = await helpers.getCommentsByGame(id);
      setComments(data);
      setLoadingComments(false);
    } catch (error) {
      setPage({ currentPage: 'list', id: 0 });
    }
  }, [id, setPage]);

  const postComment = async () => {
    try {
      const comment = {
        gameId: id,
        comment: inputComment,
      };

      helpers.postComment(comment).then(() => {
        fetchCommentsByGame();
        setInputComment('');
      });
    } catch (error) {
      setPage({ currentPage: 'list', id: 0 });
    }
  };

  const handleInputChange = (e) => {
    setInputComment(e.target.value);
  };

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

  useEffect(() => {
    fetchCommentsByGame();
  }, [fetchCommentsByGame]);

  return (
    <>
      <div className="button-container">
        <button
          type="button"
          className="button-container__button"
          onClick={() => setPage({ currentPage: 'list', id: 0 })}
        >
          <i className="button-container__icon bi bi-arrow-left-circle-fill"></i>
          Back
        </button>
      </div>

      {loadingGame && <Loader />}

      {!loadingGame && (
        <div className="details-container">
          <div className="card-container">
            <Card game={game} />
          </div>
          <div className="info-container">
            <p className="info-container__title">{game.title}</p>
            <p className="info-container__description">{game.description}</p>
          </div>
        </div>
      )}

      <div className="comments-container">
        <p className="comments-container__title">Write a comment:</p>
        <textarea
          className="comments-container__textarea"
          value={inputComment}
          onChange={handleInputChange}
        ></textarea>
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

        {loadingComments && <Loader />}

        {!loadingComments && <Comments comments={comments} />}
      </div>
    </>
  );
};

Details.propTypes = {
  id: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Details;
