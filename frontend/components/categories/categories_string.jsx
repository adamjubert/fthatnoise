import React from 'react';
import { Link } from 'react-router';

const CategoriesString = ({ categories }) => {
  const categoryLinks = categories.map((category, i) => (
    <Link key={i} to={ `/categories/${category.id}` } className="short-idea-categories">
      { category.name }
    </Link>
  ));

  return <p className="short-idea-categories-wrapper">{ categoryLinks }</p>;
};

export default CategoriesString;
