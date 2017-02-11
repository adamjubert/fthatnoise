import React from 'react';
import { Link, withRouter } from 'react-router';
import Errors from '../errors/errors';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      email: "",
      zip_code: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlechange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.router.push("/");
    });
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  otherLink() {
    if (this.props.formType === "login") {
      return <p>Haven't joined yet? <Link to="/signup">Sign up</Link> instead</p>;
    } else {
      return <p>Already joined? <Link to="/signin">{ "Sign in" }</Link> instead</p>;
    }
  }

  additionalFields() {
    if (this.props.formType === "signup") {
      const { password_confirmation, email, zip_code } = this.state;
      return (
        <div>
          <input type="password" value={ password_confirmation } placeholder="confirm password" onChange={ this.handleChange("password_confirmation") }/>
          <input type="email" value={ email } placeholder="e-mail (never shown)" onChange={ this.handleChange("email") }/>
          <input type="text" value={ zip_code } placeholder="zip code (optional)" onChange={ this.handleChange("zip_code") }/>
        </div>
      );
    }
  }

  render() {
    const { formType } = this.props;
    const { username, password } = this.state;
    const message = formType === "login" ? "Sign In" : "Sign Up";

    return (
      <div>
        { this.otherLink() }
        <Errors errors={ this.props.errors } />

        <form className="form" onSubmit = { this.handleSubmit }>
          <legend>{ message }</legend>

          <input type="text" value={ username } placeholder="username" onChange={ this.handleChange("username") }/>
          <input type="password" value={ password } placeholder="password" onChange={ this.handleChange("password") }/>

          { this.additionalFields() }

          <input type="submit" value={ message } className="button accept-button"/>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
