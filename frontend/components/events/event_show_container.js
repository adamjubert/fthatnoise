import { connect } from 'react-redux';
import IdeaShow from '../ideas/idea_show';
import { requestSingleEvent } from '../../actions/event_actions';

const mapStateToProps = ({ event }) => ({
  idea: event,
  ideaType: "event"
});

const mapDisPatchtoProps = dispatch => ({
  requestSingleIdea: id => dispatch(requestSingleEvent(id))
});

export default connect(
  mapStateToProps,
  mapDisPatchtoProps
)(IdeaShow);
