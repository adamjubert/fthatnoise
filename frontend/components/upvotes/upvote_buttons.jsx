import React from 'react';
import { ShareButtons } from 'react-share';
const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

const IdeaShareButtons = ({ ideaLink, title }) => {
  return (
    <div className="idea-share-buttons">
      <FacebookShareButton
        url={ ideaLink }
        title={ title }
        className="button share-button">
        <i className="fa fa-facebook-square" aria-hidden="true" />
      </FacebookShareButton>

      <TwitterShareButton
        url={ ideaLink }
        title={ title }
        className="button share-button"
        hashtags={ ["fthatnoise"]}>
        <i className="fa fa-twitter-square" aria-hidden="true" />
      </TwitterShareButton>
    </div>
  );
};

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

  defaultButtons(ideaLink) {
    const { idea, ideaType } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button" onClick={ this.completeLoginCheck }>
          { complete }
        </button>
        <button className="button follow-button" onClick={ this.pendingUpvoteCheck }>
          Interested
        </button>
        <button className="button ignore-button" onClick={ this.ignoreUpvoteCheck }>
          Ignore
        </button>

        <IdeaShareButtons ideaLink={ ideaLink } title={ idea.title } />
      </div>
    );
  }

  pendingButtons(ideaLink) {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea,
      ignoreUpvoteIdea, removeSingleIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";


    const onClickComplete = () => {
      if (removeSingleIdea && ideaType === "action") {
        return () => completeUpvoteIdea(idea).then(() => removeSingleIdea(idea));
      } else {
        return () => completeUpvoteIdea(idea);
      }
    };

    const onClickIgnore = () => {
      if (removeSingleIdea && ideaType === "action") {
        return () => ignoreUpvoteIdea(idea).then(() => removeSingleIdea(idea));
      } else {
        return () => ignoreUpvoteIdea(idea);
      }
    };

    return (
      <div className="upvote-buttons-container">
        <button className="button follow-button disabled-button" disabled>
          Interested
        </button>
        <button className="button accept-button" onClick={ onClickComplete() }>
          { complete }
        </button>
        <button className="button ignore-button" onClick={ onClickIgnore() }>
          Ignore
        </button>

        <IdeaShareButtons ideaLink={ ideaLink } title={ idea.title } />
      </div>
    );
  }

  ignoreButtons(ideaLink) {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";

    return (
      <div className="upvote-buttons-container">
        <button className="button ignore-button disabled-button" disabled onClick={() => ignoreUpvoteIdea(idea)}>
          Ignored
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          Interested
        </button>
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          { complete }
        </button>

        <IdeaShareButtons ideaLink={ ideaLink } title={ idea.title } />
      </div>
    );
  }

  completeButtons(ideaLink) {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete!";
    let interestedButton = null;

    if (ideaType === "event") {
      interestedButton = (
        <div>
          <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
            Interested
          </button>
          <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
            Ignore
          </button>
        </div>
      );
    }

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled-button" disabled>
          { complete }
        </button>
        { interestedButton }

        <IdeaShareButtons ideaLink={ ideaLink } title={ idea.title } />
      </div>
    );
  }

  creatorButtons(ideaLink) {
    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button disabled-button" disabled>
          Your idea :)
        </button>

        <IdeaShareButtons ideaLink={ ideaLink } title={ this.props.idea.title } />
      </div>
    );
  }

  render() {
    const { idea, ideaType } = this.props;
    const ideaLink = `www.fthatnoise.com/#/${this.props.ideaType}s/${this.props.idea.id}`;

    if (!this.props.currentUser || !idea.upvotes_status) {
      return this.defaultButtons(ideaLink);
    } else if (idea.creator_viewing) {
      return this.creatorButtons(ideaLink);
    } else if (idea.upvotes_status === "pending") {
      return this.pendingButtons(ideaLink);
    } else if (idea.upvotes_status === "ignore") {
      return this.ignoreButtons(ideaLink);
    } else {
      return this.completeButtons(ideaLink);
    }
  }
}

export default UpvoteButtons;
