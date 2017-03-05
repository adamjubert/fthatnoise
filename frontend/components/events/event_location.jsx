import React from 'react';
import EventMapContainer from './event_map_container';

class EventLocation extends React.Component {
  render () {
    if (!this.props.idea.latitude) return null;

    return (
      <section className="event-location" id="location">
        <EventMapContainer />
        <div className="event-address">
          <p>{ this.props.idea.address }</p>
          <p>{ this.props.idea.city }, { this.props.idea.state }</p>
          <button onClick={() => this.props.receiveModal("map") }>
            View Larger Map
          </button>
        </div>
      </section>
    );
  }
}

export default EventLocation;
