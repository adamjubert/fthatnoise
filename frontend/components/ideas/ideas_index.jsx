import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';
import SubNavContainer from '../sub_nav/sub_nav_container';

class IdeasIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllIdeas();
  }

  render() {
    const { ideas, ideaType } = this.props;

    if (ideas.length === 0) return null;
    const ideaIndexItems = ideas.map((idea, i) => (
      <IdeaIndexItem idea={ idea } ideaType={ ideaType } key={i} />
    ));

    return (
      <div>
        <SubNavContainer />
        <ul className="idea-list">
          { ideaIndexItems }
        </ul>
      </div>
    );
  }
}

export default IdeasIndex;
