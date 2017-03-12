import { connect } from 'react-redux';
import SubNav from './sub_nav';
import { receiveModal } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modalType => dispatch(receiveModal(modalType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubNav);
