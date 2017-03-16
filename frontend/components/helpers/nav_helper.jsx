import React from 'react';
import { Link } from 'react-router';
import SearchBar from '../search_bar/search_bar_container';

export const Spinner = () => {
  return (
    <div className="spinner">
      <img src={ window.images.angryCatLogo } className="spinner-img"/>
      <img src={ window.images.angryCatLogo } className="spinner-img cat-two"/>
      <img src={ window.images.angryCatLogo } className="spinner-img cat-three"/>
    </div>
  );
};

export const ActionFilters = ({ subNavClick, query }) => {
  const hotClass = query.order === "hot" ? "sub-options sub-selected" : "sub-options";
  const trendingClass = query.order === "trending" ? "sub-options sub-selected" : "sub-options";
  const recentClass = query.order === "recent" || !query.order ? "sub-options sub-selected" : "sub-options";

  return (
    <div className="sub-options-container">
      <button className={ hotClass } onClick={ subNavClick("hot") }>Hot</button>
      <button className={ trendingClass } onClick={ subNavClick("trending") }>Trending</button>
      <button className={ recentClass } onClick={ subNavClick("recent") }>Recent</button>
      <SearchBar />
    </div>
  );
};

export const EventFilters = ({ zipCode, queryZip, handleZipChange }) => {
  const currentZip = zipCode ? zipCode : "Search";

  return (
    <div className="sub-options-container">
    <Link to="#" className="sub-options sub-selected">{ currentZip }</Link>
    <input type="text" placeholder="Zip code"
      value={ queryZip }
      onChange={ handleZipChange }
      className="home-search" />
      <Link to={{pathname: "/events", query: { zip_code: queryZip }}} className="home-search-button">
          <i className="fa fa-search" aria-hidden="true" />
      </Link>
    </div>
  );
};

export const NewIdeaLinks = ({ currentUser, router, receiveModal }) => {
  if (currentUser) {
    return (
      <div className="create-options-container">
        <div className="create-options-link-container">
          <Link to="/actions/new" className="create-options-link">
            <div className="create-options">
              <h4>Add Action <i className="fa fa-plus-circle" aria-hidden="true"></i></h4>
            </div>
            <p id="create-options-desc-one">
              Suggest an action that people can do to make a difference - call your representative, write letters, support certain businesses - the possibilities are endless!
            </p>
          </Link>
        </div>
        <div className="create-options-link-container">
          <Link to="/events/new" className="create-options-link">
            <div className="create-options">
              <h4>Add Event <i className="fa fa-plus-circle" aria-hidden="true"></i></h4>
            </div>
            <p id="create-options-desc-two">
              Spread the word about events where people can join together to effect positive change. Demonstrations, hackathons, rallies, and more!
            </p>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="create-options-signin">
        <h4>Please <button onClick={ () => receiveModal("signup") }>sign up</button>
          &nbsp;or <button onClick={ () => receiveModal("login") }>sign in</button>
          &nbsp;to create an action or event.</h4>
      </div>
    );
  }
};
