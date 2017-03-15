import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';
import SubNavContainer from '../sub_nav/sub_nav_container';
import { Spinner } from '../helpers/nav_helper';
import Errors from '../errors/errors';

class IdeasIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.requestAllIdeas(this.props.location.query).then(
      () => this.setState({ loading: false }),
      () => this.setState({ loading: false })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.category !== this.props.location.query.category
      || nextProps.location.query.order !== this.props.location.query.order
      || nextProps.location.query.zip_code !== this.props.location.query.zip_code) {
      this.setState({ loading: true });

      this.props.requestAllIdeas(nextProps.location.query).then(
        () => this.setState({ loading: false }),
        () => {
          this.setState({ loading: false });
        }
      );
    }
  }

  ideaIndexItems() {
    if (this.props.ideas.length <= 0) {
      return (
        <ul className="idea-list">
          <li>No results found :(</li>
        </ul>
      );
    }
    return (
      <ul className="idea-list">
        {
          this.props.ideas.map((idea, i) => (
            <IdeaIndexItem idea={ idea }
              ideaType={ this.props.ideaType }
              key={i} />
          ))
        }
      </ul>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <SubNavContainer />
          <Spinner />
        </div>
      );
    } else if (this.props.errors && this.props.errors.length >= 1) {
      return (
        <div>
          <SubNavContainer />
          <Errors errors={ this.props.errors } />
        </div>
      );
    } else {
      return (
        <div>
          <SubNavContainer />
          { this.ideaIndexItems() }
        </div>
      );
    }
  }
}

export default IdeasIndex;
