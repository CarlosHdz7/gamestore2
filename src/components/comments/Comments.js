import React from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

const Comments = ({ comments }) => {
  if (comments.length) {
    return (
      <>
        {comments.map(({ id, body, user: { username } }) => (
          <div className="comment" key={id}>
            <p>
              <span className="comment__user">
                {username}
                :
              </span>
              {body}
            </p>
          </div>
        ))}
      </>
    );
  }

  return <p className="no-comments">No comments yet</p>;
};

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.instanceOf(Array),
};

export default Comments;
