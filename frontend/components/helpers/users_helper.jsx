import React from 'react';
import { Link } from 'react-router';

export const ActionLinks = () => {
  return (
    <nav className="user-nav">
      <ul>
        <li><Link to="/profile/actions" className="nav-toggle nav-toggle-active">Actions</Link></li>
        <li><Link to="/profile/events" className="nav-toggle nav-toggle-inactive">Events</Link></li>
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "following", type: "actions" }}}>To Do</Link></li>
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "completed", type: "actions" }}}>Completed</Link></li>
        <li><Link to={{ pathname: "/profile/actions", query: { actions: "mine", type: "actions" }}}>Mine</Link></li>
      </ul>
    </nav>
  );
};

export const EventLinks = () => {
  return (
    <nav className="user-nav">
      <ul>
        <li><Link to="/profile/actions" className="nav-toggle nav-toggle-inactive">Actions</Link></li>
        <li><Link to="/profile/events" className="nav-toggle nav-toggle-active">Events</Link></li>
        <li><Link to={{ pathname: "/profile/events", query: { events: "following", type: "events" }}}>Upcoming</Link></li>
        <li><Link to={{ pathname: "/profile/events", query: { events: "completed", type: "events" }}}>Past</Link></li>
        <li><Link to={{ pathname: "/profile/events", query: { events: "mine", type: "events" }}}>Mine</Link></li>
      </ul>
    </nav>
  );
};
