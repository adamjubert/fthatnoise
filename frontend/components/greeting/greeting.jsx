import React from 'react';
import { Link } from 'react-router';

const Greeting = ({ currentUser, logout, receiveModal }) => {
  if (currentUser) {
    return (
      <ul className="nav-items">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "following", type: "action" }}}>{ currentUser.username }</Link></li>
        <li><button onClick={ logout }>Log Out</button></li>
      </ul>
    );
  }

  return (
    <ul className="nav-items">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><button onClick={ () => receiveModal("signup") }>
        Sign Up
      </button></li>
      <li><button onClick={ () => receiveModal("login") }>
        Sign In
      </button></li>
    </ul>
  );
};

export default Greeting;
