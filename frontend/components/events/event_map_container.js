import { connect } from 'react-redux';
import EventMap from './event_map';

const mapStateToProps = state => ({
  idea: state.event
});

export default connect(
  mapStateToProps,
  null
)(EventMap);
