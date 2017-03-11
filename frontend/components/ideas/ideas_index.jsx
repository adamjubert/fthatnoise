import React from 'react';
import IdeaIndexItem from '../ideas/idea_index_item';
import SubNavContainer from '../sub_nav/sub_nav_container';
import { Spinner } from '../helpers/nav_helper';

class IdeasIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.requestAllIdeas(this.props.location.query).then(
      () => this.setState({ loading: false })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.category !== this.props.location.query.category
      || nextProps.location.query.order !== this.props.location.query.order) {
      this.setState({ loading: true });
      this.props.requestAllIdeas(nextProps.location.query).then(
        () => this.setState({ loading: false })
      );
    }
  }

  render() {
    const { ideas, ideaType } = this.props;

    if (this.state.loading) {
      return (
        <div>
          <SubNavContainer />
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <SubNavContainer />
          <ul className="idea-list">
            {
              ideas.map((idea, i) => (
                <IdeaIndexItem idea={ idea } ideaType={ ideaType } key={i} />
              ))
            }
          </ul>
        </div>
      );
    }
  }
}

export default IdeasIndex;
