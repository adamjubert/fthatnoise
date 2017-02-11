import React from 'react';
import { Link } from 'react-router';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <li><button onClick={ logout }>Log Out</button></li>
    );
  }

  return (
    <div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};

export default Greeting;
