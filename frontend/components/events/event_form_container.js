import { connect } from 'react-redux';
import { createEvent, updateEvent, requestSingleEvent } from '../../actions/event_actions';
import { requestAllCategories } from '../../actions/category_actions';
import EventForm from './event_form';

const mapStateToProps = (state, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length - 4, ownProps.location.pathname.length);
  let formType = "new";

  if (pathName === "edit") formType = "edit";

  return {
    errors: state.errors.event,
    event: state.event,
    categories: state.categories,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const pathName = ownProps.location.pathname.slice(ownProps.location.pathname.length -4, ownProps.location.pathname.length);
  const formAction = pathName === "edit" ? updateEvent : createEvent;

  return {
    processForm: event => dispatch(formAction(event)),
    requestSingleEvent: event => dispatch(requestSingleEvent(event)),
    requestAllCategories: () => dispatch(requestAllCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
