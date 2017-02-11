import React from 'react';

export const FormattedComment = ({ comment }) => (
  <div>
    <h4>{ comment.author } { comment.created_at }</h4>
    <p>{ comment.body }</p>
  </div>
);

export default FormattedComment;
