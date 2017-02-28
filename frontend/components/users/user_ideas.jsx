import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';

class UserIdeas extends React.Component {
  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.type !== this.props.location.query.type
      || nextProps.location.query.actions !== this.props.location.query.actions
      || nextProps.location.query.events !== this.props.location.query.events) {
      this.props.requestCurrentUser(nextProps.location.query);
    }
  }

  render() {
    const { ideas, ideaType } = this.props;

    if (ideas.length === 0) return (
      <div className="user-profile-container">
        <h1>None so far! Why don't you check out the homepage to get started?</h1>
      </div>
    );

    const ideaIndexItems = ideas.map((idea, i) => (
      <IdeaIndexItem idea={ idea } ideaType={ ideaType } key={i} />
    ));

    return (
      <div className="user-profile-container">
        <ul className="idea-list">
          { ideaIndexItems }
        </ul>
      </div>
    );
  }
}

export default UserIdeas;
