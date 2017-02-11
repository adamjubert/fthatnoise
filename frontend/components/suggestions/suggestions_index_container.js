import { connect } from 'react-redux';
import SuggestionsIndex from './suggestions_index';
import { requestAllSuggestions } from '../../actions/suggestion_actions';
import { selectAllSuggestions } from '../../reducers/suggestions_selectors';

const mapStateToProps = state => ({
  suggestions: selectAllSuggestions(state)
});

const mapDispatchToProps = dispatch => ({
  requestAllSuggestions: () => dispatch(requestAllSuggestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionsIndex);
