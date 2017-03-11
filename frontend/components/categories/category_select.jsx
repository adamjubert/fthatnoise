import React from 'react';
import { Link, withRouter } from 'react-router';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.requestAllCategories();
  }

  handleChange(e) {
    const order = this.props.location.query.order ?
      this.props.location.query.order : "recent";

    if (e.currentTarget.value !== "") {
      this.props.router.push(
        { pathname: this.props.location.pathname,
          query: { category: e.currentTarget.value, order: order }}
      );
    } else {
      this.props.router.push(
        { pathname: this.props.location.pathname, query: { order: order }}
      );
    }
  }

  categorySelectItems() {
    return this.props.categories.map(category => {
      return (
        <option value={ category.id } key={ category.id }>
          { category.name }
        </option>
      );
    });
  }

  render() {
    const categorySelectValue = this.props.location.query.category || "";

    return (
      <select value={ categorySelectValue } onChange={ this.handleChange } className="category-select">
        <option value="">
          All Categories
        </option>
        { this.categorySelectItems() }
      </select>
    );
  }
}

export default withRouter(CategorySelect);
