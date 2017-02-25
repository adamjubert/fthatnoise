import React from 'react';
import { Link } from 'react-router';
import CategoriesString from '../categories/categories_string';
import UpvoteButtonsContainer from '../upvotes/upvote_buttons_container';

const IdeaIndexItem = ({ idea, ideaType }) => {
  if (idea.upvotes_status === "ignore" ||
    (ideaType === "event" && idea.in_past)) return null;

  const ideaLink = `${ideaType}s/${idea.id}`;

  let eventLogistics = null;

  if (ideaType === "event") {
    eventLogistics = (
      <div>
        <p>{ idea.formatted_date }</p>
        <p>{ idea.formatted_time_range }</p>
        <p>{ idea.formatted_location }</p>
      </div>
    );
  }

  return (
  <div className="short-idea">
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
        <CategoriesString categories={ idea.categories } />
        { eventLogistics }
        <p><span>Created by: </span>{ idea.creator.username }</p>
        <p><span>Details: </span>{ idea.shortened_description }</p>
        <UpvoteButtonsContainer idea={ idea } ideaType={ ideaType } />
      </div>
    </div>
  );
};

export default IdeaIndexItem;
