import React from 'react';

class UpvoteButtons extends React.Component {
  constructor(props) {
    super(props);

    this.completeLoginCheck = this.completeLoginCheck.bind(this);
    this.pendingUpvoteCheck = this.pendingUpvoteCheck.bind(this);
    this.ignoreUpvoteCheck = this.ignoreUpvoteCheck.bind(this);
  }

  completeLoginCheck() {
    if (this.props.currentUser) {
      this.props.completeUpvoteIdea(this.props.idea);
    } else {
      this.props.receiveModal("login");
    }
  }

  pendingUpvoteCheck() {
    if (this.props.currentUser) {
      this.props.pendingUpvoteIdea(this.props.idea);
    } else {
      this.props.receiveModal("login");
    }
  }

  ignoreUpvoteCheck() {
    if (this.props.currentUser) {
      this.props.ignoreUpvoteIdea(this.props.idea);
    } else {
      this.props.receiveModal("login");
    }
  }

  render() {
    const { idea, ideaType } = this.props;
    const ideaLink = `www.fthatnoise.com/#/${this.props.ideaType}s/${this.props.idea.id}`;

    const complete = ideaType === "event" ? "Going!" : "Complete!";
    let completeClass = "button accept-button";
    let interestedClass = "button follow-button";
    let ignoreClass = "button ignore-button";

    if (idea.upvotes_status === "complete") {
      completeClass += " selected-button";
    } else if (idea.upvotes_status === "ignore") {
      ignoreClass += " selected-button";
    } else if (idea.upvotes_status === "pending") {
      interestedClass += " selected-button";
    }

    return (
      <div className="upvote-buttons-container">
        <button className={ completeClass } onClick={ this.completeLoginCheck }>
          { complete }
        </button>
        <button className={ interestedClass } onClick={ this.pendingUpvoteCheck }>
          Interested
        </button>
        <button className={ ignoreClass } onClick={ this.ignoreUpvoteCheck }>
          Ignore
        </button>
      </div>
    );
  }
}

export default UpvoteButtons;
