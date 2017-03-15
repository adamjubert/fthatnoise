import React from 'react';
import { Link, withRouter } from 'react-router';

const Greeting = ({ currentUser, logout, receiveModal, router }) => {
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (currentUser) {
    return (
      <ul className="nav-items">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "following", type: "action" }}}>{ currentUser.username }</Link></li>
        <li><button onClick={ handleLogout }>Log Out</button></li>
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

export default withRouter(Greeting);
