import React from 'react';
import { Link } from 'react-router';
import CategoriesString from '../categories/categories_string';
import UpvoteButtonsContainer from '../upvotes/upvote_buttons_container';

const IdeaIndexItem = ({ idea, ideaType, removeSingleIdea }) => {
  if (idea.upvotes_status === "ignore" ||
    (ideaType === "event" && idea.in_past)) return null;

  const ideaLink = `${ideaType}s/${idea.id}`;

  let eventLogistics = null;

  if (ideaType === "event") {
    eventLogistics = (
      <div className="event-logistics">
        <p className="event-date-time"><span>Date: </span>{ idea.formatted_date }</p>
        <p className="event-date-time"><span>Time: </span>{ idea.formatted_time_range }</p>
        <p className="event-address"><span>Address: </span>{ idea.formatted_location }</p>
      </div>
    );
  }

  return (
    <div className={ `short-idea short-idea-${ideaType}`}>
      <div className="short-idea-header">
        <div>
          <h3><Link to={ ideaLink }>
            { idea.title }
          </Link></h3>
        </div>
        <div className="short-idea-upvotes-count">
          <h4>Followers</h4>
          <h3>{ idea.upvotes_count }</h3>
        </div>
      </div>
      <div className="short-idea-body">
        <div className="short-idea-detail-container">
          <CategoriesString categories={ idea.categories } />
          <p><span>Created by: </span>{ idea.creator.username }</p>
          <p><span>Details: </span>{ idea.shortened_description }</p>
          { eventLogistics }
        </div>
        <UpvoteButtonsContainer idea={ idea } ideaType={ ideaType } removeSingleIdea={ removeSingleIdea }/>
      </div>
    </div>
  );
};

export default IdeaIndexItem;
