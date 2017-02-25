import React from 'react';
import { Link } from 'react-router';

const Greeting = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <ul className="nav-items">
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "following", type: "action" }}}>{ currentUser.username }</Link></li>
        <li><button onClick={ logout }>Log Out</button></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    );
  }

  return (
    <ul className="nav-items">
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/signin">Sign In</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
};

export default Greeting;
