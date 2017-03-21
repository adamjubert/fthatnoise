import { connect } from 'react-redux';
import { createSuggestionComment } from '../../actions/suggestion_actions';
import { createEventComment } from '../../actions/event_actions';
import { receiveModal } from '../../actions/modal_actions';
import { clearCommentErrors } from '../../actions/comment_actions';
import CommentForm from './comment_form';

const mapStateToProps = state => {
  return {
    errors: state.errors.comment,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleSubmit = ownProps.ideaType === "event" ? createEventComment : createSuggestionComment;

  return {
    handleSubmit: comment => dispatch(handleSubmit(comment)),
    receiveModal: modalType => dispatch(receiveModal(modalType)),
    clearCommentErrors: () => dispatch(clearCommentErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
