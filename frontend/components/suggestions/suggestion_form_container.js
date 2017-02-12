import { connect } from 'react-redux';
import { createSuggestion, updateSuggestion, requestSingleSuggestion } from '../../actions/suggestion_actions';
import { requestAllCategories } from '../../actions/category_actions';
import SuggestionForm from './suggestion_form';

const mapStateToProps = (state, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length - 4, ownProps.location.pathname.length);
  let formType = "new";

  if (pathName === "edit") formType = "edit";

  return {
    errors: state.errors.suggestion,
    suggestion: state.suggestion,
    categories: state.categories,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length -4, ownProps.location.pathname.length);
  const formAction = pathName === "edit" ? updateSuggestion : createSuggestion;

  return {
    processForm: suggestion => dispatch(formAction(suggestion)),
    requestSingleSuggestion: suggestion => dispatch(requestSingleSuggestion(suggestion)),
    requestAllCategories: () => dispatch(requestAllCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionForm);
