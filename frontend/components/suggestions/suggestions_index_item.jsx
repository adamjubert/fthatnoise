import React from 'react';
import { Link } from 'react-router';
import CategoriesString from '../categories/categories_string';

const SuggestionIndexItem = ({ suggestion }) => {
  return (
  <div className="short-idea">
      <h3 className="short-idea-header">
        <Link to={`/actions/${suggestion.id}`}>
          { suggestion.title } ({ suggestion.upvotes_count } activists)
        </Link>
      </h3>
      <div className="short-idea-body">
        <CategoriesString categories={ suggestion.categories } />
        { suggestion.description }
      </div>
    </div>
  );
};

export default SuggestionIndexItem;
