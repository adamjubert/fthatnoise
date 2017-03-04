import { connect } from 'react-redux';
import { createContact } from '../../actions/contact_actions';
import ContactForm from './contact_form';

const mapStateToProps = state => ({
  errors: state.errors.contact,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: contact => dispatch(createContact(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);
