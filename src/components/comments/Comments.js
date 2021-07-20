import React from 'react';
import './Comments.scss';

const Comments = ({ comments = [] }) => {
  if (comments.length) {
    return (
      <>
        {comments.map(({ id, comment }) => (
          <div className="comment" key={id}>
            <p>Anonymous: {comment}</p>
          </div>
        ))}
      </>
    );
  }

  return <p className="no-comments">No comments yet</p>;
};

export default Comments;
