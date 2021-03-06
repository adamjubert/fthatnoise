import { connect } from 'react-redux';
import { receiveModal, clearModal } from '../../actions/modal_actions';
import EventLocation from './event_location';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modal => dispatch(receiveModal(modal)),
  clearModal: () => dispatch(clearModal())
});

export default connect(
  null,
  mapDispatchToProps
)(EventLocation);
