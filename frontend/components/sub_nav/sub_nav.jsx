import React from 'react';
import { Link } from 'react-router';

class SubNav extends React.Component {
  render () {
    let actionLinks;

    if (this.props.currentUser) {
      actionLinks = (
        <div>
          <h4 className="create-options"><i className="fa fa-plus-circle" aria-hidden="true"></i> <Link to="/actions/new">Create Action</Link></h4>
          <h4 className="create-options"><i className="fa fa-plus-circle" aria-hidden="true"></i> <Link to="/events/new">Create Event</Link></h4>
        </div>
      );
    } else {
      actionLinks = (
        <h4><Link to="signup">Sign up</Link> or <Link to="signin">sign in</Link> to create an action or event.</h4>
      );
    }

    return (
      <div className="options">
        <Link to="/actions" className="main-options main-selected">Actions</Link>
        <Link to="/events" className="main-options">Events</Link>

        <Link to="#" className="sub-options sub-selected">Hot</Link>
        <Link to="#" className="sub-options">Trending</Link>
        <Link to="#" className="sub-options">Near Me</Link>
        <Link to="#" className="sub-options">Most Recent</Link>
        <input type="text" name="" value="" placeholder="Search..." />

        <section className="action-links">
          { actionLinks }
        </section>
      </div>
    );
  }
}

export default SubNav;
