import { connect } from 'react-redux';
import { pendingUpvoteSuggestion, ignoreUpvoteSuggestion, completeUpvoteSuggestion } from '../../actions/suggestion_actions';
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

    };
  }
};

export default connect(
  null,
  mapDispatchToProps
)(UpvoteButtons);
