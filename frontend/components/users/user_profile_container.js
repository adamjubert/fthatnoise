import { connect } from 'react-redux';
import UserProfile from './user_profile';

const mapStateToProps = state => ({
  user: state.userDetail
});

export default connect(
  mapStateToProps,
  null
)(UserProfile);
