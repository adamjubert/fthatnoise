import React from 'react';
import SuggestionIndexItem from './suggestions_index_item';

class SuggestionsIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllSuggestions();
  }

  render() {
    const { suggestions } = this.props;
    const suggestionIndexItems = suggestions.map((suggestion, i) => (
      <SuggestionIndexItem suggestion={ suggestion } key={i} />
    ));

    return (
      <ul className="idea-list">
        { suggestionIndexItems }
      </ul>
    );
  }
}

export default SuggestionsIndex;
