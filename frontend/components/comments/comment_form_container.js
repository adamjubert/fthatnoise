import { connect } from 'react-redux';
import { createSuggestionComment } from '../../actions/suggestion_actions';
import { createEventComment } from '../../actions/event_actions';
import CommentForm from './comment_form';

const mapStateToProps = state => {
  return {
    errors: state.errors.comment
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleSubmit = ownProps.ideaType === "event" ? createEventComment : createSuggestionComment;

  return {
    handleSubmit: comment => dispatch(handleSubmit(comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
