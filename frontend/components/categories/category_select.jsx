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
    let query = e.currentTarget.value ?
      { category: e.currentTarget.value } : {};

    if (this.props.type == "actions") {
      const order = this.props.location.query.order ?
      this.props.location.query.order : "recent";

      query = Object.assign({}, query, {order: order});
    } else {
      const zip_code = this.props.location.query.zip_code;
      query = Object.assign({}, query, { zip_code: zip_code });
    }

    if (e.currentTarget.value !== "") {
      this.props.router.push(
        { pathname: this.props.location.pathname,
          query: query}
      );
    } else {
      this.props.router.push(
        { pathname: this.props.location.pathname, query: query}
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
