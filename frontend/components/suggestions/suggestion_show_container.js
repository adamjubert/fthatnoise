import { connect } from 'react-redux';
import IdeaShow from '../ideas/idea_show';
import { requestSingleSuggestion } from '../../actions/suggestion_actions';

const mapStateToProps = ({ suggestion }) => ({
  idea: suggestion,
  ideaType: "action"
});

const mapDisPatchtoProps = dispatch => ({
  requestSingleIdea: id => dispatch(requestSingleSuggestion(id))
});

export default connect(
  mapStateToProps,
  mapDisPatchtoProps
)(IdeaShow);
