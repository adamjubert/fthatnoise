import { connect } from 'react-redux';
import { pendingUpvoteSuggestion, ignoreUpvoteSuggestion, completeUpvoteSuggestion } from '../../actions/suggestion_actions';
import { pendingUpvoteEvent, ignoreUpvoteEvent, completeUpvoteEvent } from '../../actions/event_actions';
import UpvoteButtons from './upvote_buttons';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.ideaType === "action") {
    return {
      pendingUpvoteIdea: idea => dispatch(pendingUpvoteSuggestion(idea)),
      ignoreUpvoteIdea: idea => dispatch(ignoreUpvoteSuggestion(idea)),
      completeUpvoteIdea: idea => dispatch(completeUpvoteSuggestion(idea))
     };
  } else {
    return {
      pendingUpvoteIdea: idea => dispatch(pendingUpvoteEvent(idea)),
      ignoreUpvoteIdea: idea => dispatch(ignoreUpvoteEvent(idea)),
      completeUpvoteIdea: idea => dispatch(completeUpvoteEvent(idea))
    };
  }
};

export default connect(
  null,
  mapDispatchToProps
)(UpvoteButtons);
