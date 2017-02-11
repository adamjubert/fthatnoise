import { connect } from 'react-redux';
import IdeasIndex from '../ideas/ideas_index';
import { requestAllSuggestions } from '../../actions/suggestion_actions';
import { selectAllSuggestions } from '../../reducers/suggestions_selectors';

const mapStateToProps = state => ({
  ideas: selectAllSuggestions(state),
  ideaType: "action"
});

const mapDispatchToProps = dispatch => ({
  requestAllIdeas: () => dispatch(requestAllSuggestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeasIndex);
