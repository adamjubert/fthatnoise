import { connect } from 'react-redux';
import { requestAllCategories } from '../../actions/category_actions.js';
import CategorySelect from './category_select';

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  requestAllCategories: () => dispatch(requestAllCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect);
