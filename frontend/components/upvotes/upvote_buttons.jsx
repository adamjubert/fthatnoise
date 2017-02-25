import React from 'react';

class UpvoteButtons extends React.Component {
  defaultButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Already did it!
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          I'm on it!
        </button>
        <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
          Not for me...
        </button>
      </div>
    );
  }

  pendingButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button follow-button disabled" disabled onClick={() => pendingUpvoteIdea(idea)}>
          You're on it!
        </button>
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Complete it!
        </button>
        <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
          Never mind...
        </button>
      </div>
    );
  }

  ignoreButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button ignore-button disabled" disabled onClick={() => ignoreUpvoteIdea(idea)}>
          You ignored
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          Changed my mind!
        </button>
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Did it anyway!
        </button>
      </div>
    );
  }

  completeButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled" disabled>
          Completed :)
        </button>
      </div>
    );
  }

  creatorButtons() {
    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled" disabled>
          Your idea :)
        </button>
      </div>
    );
  }

  render() {
    const { idea, ideaType } = this.props;
    if (!idea.upvotes_status) {
      return this.defaultButtons();
    } else if (idea.creator_viewing) {
      return this.creatorButtons();
    } else if (idea.upvotes_status === "pending") {
      return this.pendingButtons();
    } else if (idea.upvotes_status === "ignore") {
      return this.ignoreButtons();
    } else {
      return this.completeButtons();
    }
  }
}

export default UpvoteButtons;

//%w(pending complete ignore going)
