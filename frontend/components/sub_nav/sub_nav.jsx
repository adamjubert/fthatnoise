import React from 'react';
import { Link, withRouter } from 'react-router';
import SearchBar from '../search_bar/search_bar_container';
import CategorySelect from '../categories/category_select_container';
import { ActionFilters, EventFilters, NewIdeaLinks } from '../helpers/nav_helper';

class SubNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryZip: ""
    };

    this.subNavClick = this.subNavClick.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleZipChange(e) {
    this.setState({ queryZip: e.currentTarget.value });
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

  buttonZipCode() {
    if (this.props.router.location.query.zip_code) {
      return this.props.router.location.query.zip_code;
    } else if (this.props.currentUser) {
      return this.props.currentUser.zip_code;
    }

    return null;
  }

  subOptions() {
    if (this.props.router.location.pathname === "/events") {

      return (
        <div className="options-container">
          <div className="options">
            <div className="options-toggle">
              <Link to={{ pathname: '/actions' }} className="main-options">Actions</Link>
              <Link to={{ pathname: '/events', query: this.props.location.query }} className="main-options main-selected">Events</Link>
            </div>

            <CategorySelect type={ "events" }/>

            <div className="sub-options-container">
              <EventFilters zipCode={ this.buttonZipCode() }
                queryZip={ this.state.queryZip }
                handleZipChange={ this.handleZipChange }/>
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
              <Link to={{ pathname: '/actions', query: this.props.location.query }} className="main-options main-selected">Actions</Link>
              <Link to={{ pathname: '/events' }} className="main-options">Events</Link>
            </div>

            <CategorySelect type={ "actions" }/>
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
          <NewIdeaLinks
            currentUser={ this.props.currentUser }
            receiveModal={ this.props.receiveModal }/>
        </section>

        { this.subOptions() }
      </div>
    );
  }
}

export default withRouter(SubNav);
