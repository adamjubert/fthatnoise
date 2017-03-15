import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';
import { Link } from 'react-router';
import { Spinner } from '../helpers/nav_helper';

class UserIdeas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query).then(
      () => this.setState({ loading: false })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.type !== this.props.location.query.type
      || nextProps.location.query.actions !== this.props.location.query.actions
      || nextProps.location.query.events !== this.props.location.query.events) {
      this.props.requestCurrentUser(nextProps.location.query).then(
        () => this.setState({ loading: false })
      );
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    const { ideas, ideaType, removeSingleIdea } = this.props;

    if (ideas.length === 0) return (
      <div className="user-profile-container">
        <h1>None so far! Why don't you check out the <Link to="/">home page</Link> to get started?</h1>
      </div>
    );

    const ideaIndexItems = ideas.map((idea, i) => (
      <IdeaIndexItem
        idea={ idea }
        ideaType={ ideaType }
        key={idea.id}
        removeSingleIdea={ removeSingleIdea } />
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
