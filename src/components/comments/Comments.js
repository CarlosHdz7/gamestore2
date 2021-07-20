import React from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

const Comments = ({ comments }) => {
  if (comments.length) {
    return (
      <>
        {comments.map(({ id, comment }) => (
          <div className="comment" key={id}>
            <p>
              Anonymous:
              {comment}
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
