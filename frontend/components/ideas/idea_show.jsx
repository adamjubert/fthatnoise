import React from 'react';
import CategoriesString from '../categories/categories_string';
import FormattedComments from '../comments/formatted_comments';

class IdeaShow extends React.Component {
  componentDidMount() {
    this.props.requestSingleIdea(this.props.params.ideaId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.ideaId !== nextProps.params.ideaId) {
      this.props.requestSingleIdea(nextProps.params.ideaId);
    }
  }

  render() {
    const { idea, ideaType } = this.props;
    if (!idea.id) return null;

    let eventLogistics = null;
    
    if (ideaType === "event") {
      eventLogistics = (
        <div>
          <p>{ idea.formatted_date }</p>
          <p>{ idea.formatted_time_range }</p>
          <p>{ idea.formatted_location }</p>
        </div>
      );
    }

    return (
      <div className="idea">
        <h1 className="idea-title">{ idea.title }</h1>
        <CategoriesString categories={ idea.categories } />

        <h3 className="idea-info">{ idea.upvotes_count } activists</h3>
        <h3 className="idea-info">Created by: { idea.creator.username }</h3>
        { eventLogistics }
        <p>{ idea.description }</p>

        <FormattedComments comments={ idea.comments } />
      </div>
    );
  }
}

export default IdeaShow;
