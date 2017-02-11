import React from 'react';
import { Link } from 'react-router';
import { values } from 'lodash';

const CategoriesString = ({ categories }) => {

  const categoryLinks = values(categories).map((category, i) => (
    <Link key={i} to={ `/categories/${category.id}` } className="short-idea-categories">
      { category.name }
    </Link>
  ));

  return <p className="short-idea-categories-wrapper">{ categoryLinks }</p>;
};

export default CategoriesString;
