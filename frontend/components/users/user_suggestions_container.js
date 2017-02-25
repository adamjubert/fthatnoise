import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import UserIdeas from './user_ideas';

const mapStateToProps = state => ({
  ideas: state.suggestions,
  ideaType: "action",
  user: state.userDetail,
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: params => dispatch(requestCurrentUser(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIdeas);