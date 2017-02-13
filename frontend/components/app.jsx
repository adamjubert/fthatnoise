import React from 'react';
import { Link } from 'react-router';
import GreetingContainer from './greeting/greeting_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "F*** That Noise"
    };
    this.angrifyLogo = this.angrifyLogo.bind(this);
    this.deAngrifyLogo = this.deAngrifyLogo.bind(this);
  }

  angrifyLogo() {
    const title = "F*** That Noise!!!";
    this.setState({ title });
  }

  deAngrifyLogo() {
    const title = "F*** That Noise";
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <nav className="main-nav">
          <div className="logo" onMouseEnter={this.angrifyLogo} onMouseLeave={this.deAngrifyLogo}>
            <Link to="/" className="logo">
            <img src="assets/angry_cat.png" />
            { this.state.title }</Link>
          </div>
          <GreetingContainer />
        </nav>
        { this.props.children }
      </div>
    );
  }
}

export default App;
