import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname === "/signin" ? "login" : "signup";

  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.location.pathname === "/signin") {
    return { processForm: user => dispatch(login(user)) };
  } else {
    return { processForm: user => dispatch(signup(user)) };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
