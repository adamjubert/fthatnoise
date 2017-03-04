import React from 'react';
import { Link } from 'react-router';
import SearchBar from '../search_bar/search_bar_container';

class SubNav extends React.Component {
  render () {
    let actionLinks;

    if (this.props.currentUser) {
      actionLinks = (
        <div className="create-options-container">
          <div className="create-options-link-container">
            <Link to="/actions/new" className="create-options-link">
              <div className="create-options">
                <h4>Add Action <i className="fa fa-plus-circle" aria-hidden="true"></i></h4>
              </div>
              <p>
                Suggest an action that people can do to make a difference - call your representative, write letters, support certain businesses - the possibilities are endless!
              </p>
            </Link>
          </div>
          <div className="create-options-link-container">
            <Link to="/events/new" className="create-options-link">
              <div className="create-options">
                <h4>Add Event <i className="fa fa-plus-circle" aria-hidden="true"></i></h4>
              </div>
              <p>
                Spread the word about events where people can join together to effect positive change. Demonstrations, hackathons, rallies, and more!
              </p>
            </Link>
          </div>
        </div>
      );
    } else {
      actionLinks = (
        <div className="create-options-signin">
          <h4>Please <Link to="signup">sign up</Link> or <Link to="signin">sign in</Link> to create an action or event.</h4>
        </div>
      );
    }

    return (
      <div className="sub-nav-container">
        <section className="action-links">
          { actionLinks }
        </section>

        <div className="options">
          <Link to="/actions" className="main-options main-selected">Actions</Link>
          <Link to="/events" className="main-options">Events</Link>

          <Link to="#" className="sub-options sub-selected">Hot</Link>
          <Link to="#" className="sub-options">Trending</Link>
          <Link to="#" className="sub-options">Near Me</Link>
          <Link to="#" className="sub-options">Most Recent</Link>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default SubNav;
