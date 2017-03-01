import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import { removeSingleEvent } from '../../actions/event_actions';
import UserIdeas from './user_ideas';

const mapStateToProps = state => ({
  ideas: state.events,
  ideaType: "event",
  user: state.userDetail,
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: params => dispatch(requestCurrentUser(params)),
  removeSingleIdea: idea => dispatch(removeSingleEvent(idea))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIdeas);
