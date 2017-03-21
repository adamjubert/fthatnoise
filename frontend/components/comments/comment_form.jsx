import React from 'react';
import Errors from '../errors/errors';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  componentWillUnmount() {
    this.props.clearCommentErrors();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleButtonPress(e) {
    e.preventDefault();

    if (this.props.currentUser) {
      this.handleSubmit();
    } else {
      this.props.receiveModal("login");
    }
  }

  handleSubmit() {
    const comment = this.state;
    comment.idea_id = this.props.idea.id;
    comment.idea_type = this.props.ideaType === "event" ? "Event" : "Suggestion";
    this.props.handleSubmit(comment).then(() => this.clearInput());
  }

  clearInput() {
    this.setState({ body: "" });
  }

  render() {
    const { body } = this.state;
    let message = "Add Comment";

    if (this.props.formType === "edit") message = "Update Action";

    return (
      <div className="comment-form-container">
        <Errors errors={this.props.errors} />
        <form className="form" id="comment-form" onSubmit={this.handleButtonPress}>
          <textarea className="comment-input" onChange={this.handleChange("body")} value={ body } placeholder="Your glorious comment here..." />
          <input type="submit" value={ message } className="button accept-button" />
        </form>
      </div>
    );
  }
}

export default CommentForm;
