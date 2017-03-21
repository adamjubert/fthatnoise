import React from 'react';
import { Link, withRouter } from 'react-router';

class CategoriesString extends React.Component {
  constructor(props) {
    super(props);
    this.categoryLinks = this.categoryLinks.bind(this);
  }

  categoryLinks() {
    if (this.props.categories) {
      return Object.keys(this.props.categories).map(categoryId => {
        const query = Object.assign(
          {},
          this.props.location.query,
          { category: categoryId }
        );

        return (
          <Link key={ categoryId }
            to={{
              pathname: `/${this.props.ideaType}s`,
              query: query
            }}
            className="short-idea-categories">
            { this.props.categories[categoryId].name }
          </Link>
        );
      });
    }
  }

  render() {
    return (
      <div className="short-idea-categories-wrapper">
        { this.categoryLinks() }
      </div>
    );
  }
}

export default withRouter(CategoriesString);
