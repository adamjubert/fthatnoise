import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';

class IdeasIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllIdeas();
  }

  render() {
    const { ideas, ideaType } = this.props;
    const ideaIndexItems = ideas.map((idea, i) => (
      <IdeaIndexItem idea={ idea } ideaType={ ideaType } key={i} />
    ));

    return (
      <ul className="idea-list">
        { ideaIndexItems }
      </ul>
    );
  }
}

export default IdeasIndex;
