import React from 'react';
import { Link } from 'react-router';
import GreetingContainer from '../greeting/greeting_container';
import HamburgerNav from '../greeting/hamburger_nav';
import ModalContainer from '../modal/modal_container';

class App extends React.Component {
  render() {
    return (
      <div>
        <ModalContainer modal={ this.props.modal } modalType={ this.props.modalType }/>
        <nav className="main-nav">
          <div className="logo">
            <Link to="/" className="logo">
              fthatnoise
              <img src="assets/angry_cat.png" />
              com
            </Link>
          </div>
          <GreetingContainer />
          <HamburgerNav />
        </nav>
        <div className="main">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
