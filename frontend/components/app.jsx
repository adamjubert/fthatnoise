import React from 'react';
import { Link } from 'react-router';
import GreetingContainer from './greeting/greeting_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "fthatnoise"
    };
    this.angrifyLogo = this.angrifyLogo.bind(this);
    this.deAngrifyLogo = this.deAngrifyLogo.bind(this);
  }

  angrifyLogo() {
    const title = "fthatnoise";
    this.setState({ title });
  }

  deAngrifyLogo() {
    const title = "fthatnoise";
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <nav className="main-nav">
          <div className="logo" onMouseEnter={this.angrifyLogo} onMouseLeave={this.deAngrifyLogo}>
            <Link to="/" className="logo">
              { this.state.title }
              <img src="assets/angry_cat.png" />
              com
            </Link>
          </div>
          <GreetingContainer />
        </nav>
        <div className="main">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
