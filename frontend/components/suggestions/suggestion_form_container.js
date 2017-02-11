import { connect } from 'react-redux';
import { createSuggestion, updateSuggestion, requestSingleSuggestion } from '../../actions/suggestion_actions';
import SuggestionForm from './suggestion_form';

const mapStateToProps = (state, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length - 4, ownProps.location.pathname.length);
  let formType = "new";

  if (pathName === "edit") formType = "edit";

  return {
    errors: state.suggestion.errors,
    suggestion: state.suggestion,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length -4, ownProps.location.pathname.length);

  if (pathName === "edit") {
    return {
      processForm: suggestion => dispatch(updateSuggestion(suggestion)),
      fetchSingleSuggestion: suggestion => dispatch(fetchSingleSuggestion(suggestion))
    };
  } else {
    return {
      processForm: suggestion => dispatch(createSuggestion(suggestion))
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionForm);
