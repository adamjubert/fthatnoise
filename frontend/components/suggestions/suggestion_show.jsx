import React from 'react';
import CategoriesString from '../categories/categories_string';
import FormattedComments from '../comments/formatted_comments';

class SuggestionShow extends React.Component {
  componentDidMount() {
    this.props.requestSingleSuggestion(this.props.params.suggestionId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.suggestionId !== nextProps.params.suggestionId) {
      this.props.requestSingleSuggestion(nextProps.params.suggestionId);
    }
  }

  render() {
    const { suggestion } = this.props;
    if (!suggestion.id) return null;

    return (
      <div className="idea">
        <h1 className="idea-title">{ suggestion.title }</h1>
        <CategoriesString categories={ suggestion.categories } />

        <h3 className="idea-info">{ suggestion.upvotes_count } activists</h3>
        <h3 className="idea-info">Created by: { suggestion.creator.username }</h3>

        <p>{ suggestion.description }</p>

        <FormattedComments comments={ suggestion.comments } />
      </div>
    );
  }
}

export default SuggestionShow;
