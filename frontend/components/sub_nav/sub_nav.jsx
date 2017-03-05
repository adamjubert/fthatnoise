import React from 'react';
import { Link, withRouter } from 'react-router';
import SearchBar from '../search_bar/search_bar_container';

class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: ""
    };
  }
  actionLinks() {
    if (this.props.currentUser) {
      return (
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
      return (
        <div className="create-options-signin">
          <h4>Please <Link to="signup">sign up</Link> or <Link to="signin">sign in</Link> to create an action or event.</h4>
        </div>
      );
    }
  }

  subOptions() {
    if (this.props.router.location.pathname === "/events") {
      return (
        <div className="options-container">
          <div className="options">
            <div className="options-toggle">
              <Link to="/actions" className="main-options">Actions</Link>
              <Link to="/events" className="main-options main-selected">Events</Link>
            </div>

            <div className="sub-options-container">
              <Link to="#" className="sub-options">Near Me</Link>
              <input type="text" placeholder="Zip code" value={ this.state.zipCode } className="home-search" />
                <button className="home-search-button">
                    <i className="fa fa-search" aria-hidden="true" />
                  </button>
              <SearchBar />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="options-container">
          <div className="options">
            <div className="options-toggle">
              <Link to="/actions" className="main-options main-selected">Actions</Link>
              <Link to="/events" className="main-options">Events</Link>
            </div>

            <div className="sub-options-container">
              <Link to="#" className="sub-options">Hot</Link>
              <Link to="#" className="sub-options">Trending</Link>
              <Link to="#" className="sub-options">Recent</Link>
              <SearchBar />
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className="sub-nav-container">
        <section className="action-links">
          { this.actionLinks() }
        </section>

        { this.subOptions() }
      </div>
    );
  }
}

export default withRouter(SubNav);
