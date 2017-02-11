import { connect } from 'react-redux';
import SuggestionShow from './suggestion_show';
import { requestSingleSuggestion } from '../../actions/suggestion_actions';

const mapStateToProps = ({ suggestion }) => ({
  suggestion
});

const mapDisPatchtoProps = dispatch => ({
  requestSingleSuggestion: id => dispatch(requestSingleSuggestion(id))
});

export default connect(
  mapStateToProps,
  mapDisPatchtoProps
)(SuggestionShow);
