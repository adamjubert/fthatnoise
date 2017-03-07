import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.requestCategories();
  }

  handleChange(e) {
    this.props.updateSearchInput(e.target.value);
  }

  handleClick(e) {
    const { searchInput, categories } = this.props;
    if (searchInput === '') {
      this.props.requestSuggestions();
      this.props.requestEvents();
    } else {
      this.props.requestSearch(searchInput, categories);
    }
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.handleClick(e);
    }
  }

  render() {
    const { searchInput, isFetching } = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={ searchInput }
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className="home-search"
        />
      <button className="home-search-button"
          onClick={this.handleClick}
        >
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>
    );
  }
}
