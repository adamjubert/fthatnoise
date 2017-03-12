import React from 'react';
import { clearAllErrors } from '../../actions/error_actions';

class Errors extends React.Component {
  componentDidMount() {
    clearAllErrors();
  }

  render() {
    const { errors } = this.props;

    if (errors.length > 0) {
      const errorItems = errors.map((error, i) => (
        <li key={i}>{ error }</li>
      ));

      return <ul className="errors">{ errorItems }</ul>;
    } else {
      return null;
    }
  }
}

export default Errors;
