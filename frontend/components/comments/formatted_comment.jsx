import React from 'react';
import { time_ago_in_words } from '../helpers/idea_helper';

export const FormattedComment = ({ comment }) => {
  return (
    <div className="comment">
      <h4><span>{ comment.author }</span> ({
          time_ago_in_words(new Date(comment.created_at))
        })</h4>
      <p>{ comment.body }</p>
    </div>
  );
};

export default FormattedComment;
