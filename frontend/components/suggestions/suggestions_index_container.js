import { connect } from 'react-redux';
import IdeasIndex from '../ideas/ideas_index';
import { requestAllSuggestions } from '../../actions/suggestion_actions';

const mapStateToProps = state => ({
  ideas: state.suggestions,
  ideaType: "action"
});

const mapDispatchToProps = dispatch => ({
  requestAllIdeas: data => dispatch(requestAllSuggestions(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeasIndex);
