import React from 'react';
import { Link } from 'react-router';

export const ActionLinks = props => {
  const params = props.params ? props.params.actions : "following";
  const followingClass = props.params.actions === "following" ? "sub-options sub-selected" : "sub-options";
  const completedClass = props.params.actions === "completed" ? "sub-options sub-selected" : "sub-options";
  const mineClass = props.params.actions === "mine" ? "sub-options sub-selected" : "sub-options";

  return (
    <div className="options-container user-profile-options">
      <div className="options">
        <div className="options-toggle">
          <Link to={{ pathname: "/profile/actions", query: { actions: params, type: "actions" }}} className="main-options main-selected">
            Actions</Link>
          <Link to={{ pathname: "/profile/events", query: { events: params, type: "events" }}} className="main-options">
            Events</Link>
        </div>
        <div className="sub-options-container">
          <Link to={{ pathname: "/profile/actions", query: { actions: "following", type: "actions" }}} className={ followingClass }>To Do</Link>
          <Link to={{ pathname: "/profile/actions", query: { actions: "completed", type: "actions" }}} className={ completedClass }>Completed</Link>
          <Link to={{ pathname: "/profile/actions", query: { actions: "mine", type: "actions" }}} className={ mineClass }>Mine</Link>
        </div>
      </div>
    </div>
  );
};

export const EventLinks = props => {
  const params = props.params ? props.params.events : "following";
  const followingClass = props.params.events === "following" ? "sub-options sub-selected" : "sub-options";
  const pastClass = props.params.events === "completed" ? "sub-options sub-selected" : "sub-options";
  const mineClass = props.params.events === "mine" ? "sub-options sub-selected" : "sub-options";


  return (
    <div className="options-container user-profile-options">
      <div className="options">
        <div className="options-toggle">
          <Link to={{ pathname: "/profile/actions", query: { actions: params, type: "actions" }}} className="nav-toggle nav-toggle-inactive" className="main-options">
            Actions</Link>
          <Link to={{ pathname: "/profile/events", query: { events: params, type: "events" }}} className="nav-toggle nav-toggle-active" className="main-options main-selected">
            Events</Link>
        </div>
        <div className="sub-options-container">
          <Link to={{ pathname: "/profile/events", query: { events: "following", type: "events" }}} className={ followingClass }>
            Upcoming
          </Link>
          <Link to={{ pathname: "/profile/events", query: { events: "completed", type: "events" }}} className={ pastClass }>
            Past
          </Link>
          <Link to={{ pathname: "/profile/events", query: { events: "mine", type: "events" }}} className={ mineClass }>
            Mine
          </Link>
        </div>
      </div>
    </div>
  );
};
