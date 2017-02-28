import React from 'react';

class UpvoteButtons extends React.Component {
  defaultButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Complete
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          Interested
        </button>
        <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
          Ignore
        </button>
        <button className="button share-button">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </button>
        <button className="button share-button">
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  pendingButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button follow-button disabled-button" disabled onClick={() => pendingUpvoteIdea(idea)}>
          Interested
        </button>
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Complete
        </button>
        <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
          Ignore
        </button>
        <button className="button share-button">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </button>
        <button className="button share-button">
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  ignoreButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button ignore-button disabled-button" disabled onClick={() => ignoreUpvoteIdea(idea)}>
          Ignored
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          Interested
        </button>
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          Complete
        </button>
        <button className="button share-button">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </button>
        <button className="button share-button">
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  completeButtons() {
    const { idea, ideatype, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled-button" disabled>
          Complete!
        </button>
        <button className="button share-button">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </button>
        <button className="button share-button">
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  creatorButtons() {
    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled-button" disabled>
          Your idea :)
        </button>
        <button className="button share-button">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </button>
        <button className="button share-button">
          <i className="fa fa-twitter-square" aria-hidden="true"></i>
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
