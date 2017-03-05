import React from 'react';

class EventMap extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentDidMount() {
    if (!this.props.idea) return;
    this.setMapOptions(this.props.idea);
    this.pos = new google.maps.LatLng(this.props.idea.latitude,
      this.props.idea.longitude);

    this.addMarker(this.pos);
  }

  setMapOptions(idea) {
    this.mapOptions = {
      center: { lat: idea.latitude,
        lng: idea.longitude },
        zoom: 13
      };
    this.map = new google.maps.Map(this.mapNode, this.mapOptions);
  }

  addMarker(pos) {
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      ideaId: this.props.idea.id
    });
    this.markers.push(marker);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    this.markers = [];
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.idea) return;
    this.setMapOptions(nextProps.idea);
    const pos = new google.maps.LatLng(nextProps.idea.latitude, nextProps.idea.longitude);
    this.clearMarkers();
    this.addMarker(pos);
  }

  render() {
    return (
      <div id="map-container" ref={ map => this.mapNode = map }>
      </div>
    );
  }
}

export default EventMap;
