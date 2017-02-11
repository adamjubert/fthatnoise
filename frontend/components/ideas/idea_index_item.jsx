import React from 'react';
import { Link } from 'react-router';
import CategoriesString from '../categories/categories_string';
import UpvoteButtons from '../upvotes/upvote_buttons';

const IdeaIndexItem = ({ idea, ideaType }) => {
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
      <h3 className="short-idea-header">
        <Link to={ ideaLink }>
          { idea.title } ({ idea.upvotes_count } activists)
        </Link>
      </h3>
      <div className="short-idea-body">
        <CategoriesString categories={ idea.categories } />
        { eventLogistics }
        <p>Created by: { idea.creator.username }</p>
        { idea.shortened_description }
        <UpvoteButtons idea={ idea } ideaType={ ideaType } />
      </div>
    </div>
  );
};

export default IdeaIndexItem;
