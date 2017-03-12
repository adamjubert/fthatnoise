import { connect } from 'react-redux';
import { pendingUpvoteSuggestion, ignoreUpvoteSuggestion, completeUpvoteSuggestion } from '../../actions/suggestion_actions';
import { pendingUpvoteEvent, ignoreUpvoteEvent, completeUpvoteEvent } from '../../actions/event_actions';
import { receiveModal } from '../../actions/modal_actions';
import UpvoteButtons from './upvote_buttons';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.ideaType === "action") {
    return {
      pendingUpvoteIdea: idea => dispatch(pendingUpvoteSuggestion(idea)),
      ignoreUpvoteIdea: idea => dispatch(ignoreUpvoteSuggestion(idea)),
      completeUpvoteIdea: idea => dispatch(completeUpvoteSuggestion(idea)),
      receiveModal: modalType => dispatch(receiveModal(modalType))
     };
  } else {
    return {
      pendingUpvoteIdea: idea => dispatch(pendingUpvoteEvent(idea)),
      ignoreUpvoteIdea: idea => dispatch(ignoreUpvoteEvent(idea)),
      completeUpvoteIdea: idea => dispatch(completeUpvoteEvent(idea)),
      receiveModal: modalType => dispatch(receiveModal(modalType))
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpvoteButtons);
