import { connect } from 'react-redux';
import Modal from './modal';
import { clearModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  if (ownProps.modalType === "map") {
    return { idea: state.event };
  }

  return {};
};

const mapDispatchToProps = dispatch => ({
  clearModal: () => dispatch(clearModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
