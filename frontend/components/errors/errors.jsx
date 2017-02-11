import React from 'react';

const Errors = ({ errors }) => {
  if (errors.length > 0) {
    const errorItems = this.props.errors.map((error, i) => (
      <li key={i}>{ error }</li>
    ));

    return <ul>{ errorItems }</ul>;
  } else {
    return null;
  }
}

export default Errors;
