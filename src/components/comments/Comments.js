import React from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

const Comments = ({ comments }) => {
  if (comments.length) {
    return (
      <>
        {comments.map(({ id, body }) => (
          <div className="comment" key={id}>
            <p>
              Anonymous:
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
