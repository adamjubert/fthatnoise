import React from 'react';
import { Link, withRouter } from 'react-router';
import SearchBar from '../search_bar/search_bar_container';
import CategorySelect from '../categories/category_select_container';
import { ActionFilters, ActionLinks } from '../helpers/nav_helper';

class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: ""
    };

    this.subNavClick = this.subNavClick.bind(this);
  }

  subNavClick(order) {
    const newQuery = Object.assign({}, this.props.location.query, { order: order });

    return e => {
      this.props.router.push({
        pathname: this.props.location.pathname,
        query: newQuery
      });
    };
  }

  subOptions() {
    if (this.props.router.location.pathname === "/events") {
      return (
        <div className="options-container">
          <div className="options">
            <div className="options-toggle">
              <Link to={{ pathname: '/actions', query: this.props.location.query }} className="main-options">Actions</Link>
              <Link to={{ pathname: '/events', query: this.props.location.query }} className="main-options main-selected">Events</Link>
            </div>

            <CategorySelect />

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
              <Link to={{ pathname: '/actions' }} className="main-options main-selected">Actions</Link>
              <Link to={{ pathname: '/events' }} className="main-options">Events</Link>
            </div>

            <CategorySelect />
            <ActionFilters subNavClick={ this.subNavClick } query={ this.props.location.query } />
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className="sub-nav-container">
        <section className="action-links">
          <ActionLinks currentUser={ this.props.currentUser } />
        </section>

        { this.subOptions() }
      </div>
    );
  }
}

export default withRouter(SubNav);
