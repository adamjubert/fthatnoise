import { connect } from 'react-redux';
import IdeasIndex from '../ideas/ideas_index';
import { requestAllEvents } from '../../actions/event_actions';

const mapStateToProps = state => ({
  ideas: state.events,
  ideaType: "event",
  currentUser: state.session.currentUser,
  errors: state.errors.event
});

const mapDispatchToProps = dispatch => ({
  requestAllIdeas: data => dispatch(requestAllEvents(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeasIndex);
