import React from 'react';
import { Link } from 'react-router';
import { ActionLinks, EventLinks } from '../helpers/users_helper';

class UserProfile extends React.Component {
  userProfileLinks() {
    if (this.props.location.pathname === "/profile/events") {
      return <EventLinks params={ this.props.location.query } pathname={ this.props.location.pathname }/>;
    } else {
      return <ActionLinks params={ this.props.location.query } pathname={ this.props.location.pathname }/>;
    }
  }

  render() {
    return (
      <div className="user-profile-container">
        { this.userProfileLinks() }
        { this.props.children }
      </div>
    );
  }
}

export default UserProfile;
