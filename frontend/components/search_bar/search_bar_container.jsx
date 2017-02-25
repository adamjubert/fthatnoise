import { connect } from 'react-redux';
import component from './search_bar';
import { updateSearchInput, searchRequest } from '../../actions/search_actions';
import { requestAllSuggestions } from '../../actions/suggestion_actions';
import { requestAllCategories } from '../../actions/category_actions';

const mapStateToProps = (state) => {
  return {
    searchInput: state.search.input,
    categories: state.categories
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearchInput: input => dispatch(updateSearchInput(input)),
    requestSearch: (input, categories) => dispatch(searchRequest(input, categories)),
    requestSuggestions: () => dispatch(requestAllSuggestions()),
    requestCategories: () => dispatch(requestAllCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);