import React from 'react';
import FormattedComment from './formatted_comment';

const FormattedComments = ({ comments }) => {
  if (comments.length === 0) return (<p>None so far!</p>);

  const formattedCommentItems = comments.map((comment, i) => (
    <FormattedComment comment={ comment } key={i} />
  ));

  return (
    <ul className="idea-comments">
      { formattedCommentItems }
    </ul>
  );
};

export default FormattedComments;
