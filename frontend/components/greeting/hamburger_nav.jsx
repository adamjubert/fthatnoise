import React from 'react';
import GreetingContainer from './greeting_container';

class HamburgerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({ hidden: !this.state.hidden });
  }

  navLinks() {
    if (!this.state.hidden) {
      return (
        <GreetingContainer className="hamburger-links"
          toggleHidden={ this.toggleHidden } />
      );
    }
  }

  render() {
    return (
      <nav className="hamburger-nav">
        <button onClick={ this.toggleHidden }>
          <i className="fa fa-bars icon" aria-hidden="true" />
        </button>

        <div className="hamburger-links">
          { this.navLinks() }
        </div>
      </nav>
    );
  }
}

export default HamburgerNav;
