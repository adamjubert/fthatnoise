import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { receiveModal, clearModal } from '../../actions/modal_actions';
import Greeting from './greeting';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveModal: modalType => dispatch(receiveModal(modalType)),
  clearModal: () => dispatch(clearModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
