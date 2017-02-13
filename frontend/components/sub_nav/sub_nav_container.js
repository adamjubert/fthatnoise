import { connect } from 'react-redux';
import SubNav from './sub_nav';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  null
)(SubNav);
