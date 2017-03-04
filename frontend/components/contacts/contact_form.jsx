import React from 'react';
import Errors from '../errors/errors';
import { withRouter } from 'react-router';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    const email = this.props.currentUser ? this.props.currentUser.email : "";

    this.state = {
      message: "",
      email: email
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state).then(() => {
      this.props.router.push("/");
    });
  }

  render() {
    const { email, message } = this.state;

    return (
      <div>
        <Errors errors={this.props.errors} />
        <form onSubmit={this.handleSubmit} className="form">
          <legend>Contact Us!</legend>

          <input type="email" value={ email } placeholder="e-mail" onChange={this.handleChange("email")}/>
          <textarea value={ message } placeholder="Your awesome message here :)" onChange={this.handleChange("message")}/>

          <input type="submit" value="Send Message!" className="button accept-button"/>
        </form>
      </div>
    );

  }
}

export default withRouter(ContactForm);
