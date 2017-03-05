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
  defaultButtons() {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";
    const ideaLink = `www.fthatnoise.com/${ideaType}s/${idea.id}`;

    return (
      <div className="upvote-buttons-container">
        <button className="button accept-button" onClick={() => completeUpvoteIdea(idea)}>
          { complete }
        </button>
        <button className="button follow-button" onClick={() => pendingUpvoteIdea(idea)}>
          Interested
        </button>
        <button className="button ignore-button" onClick={() => ignoreUpvoteIdea(idea)}>
          Ignore
        </button>

        <IdeaShareButtons ideaLink={ ideaLink } title={ idea.title } />
      </div>
    );
  }

  pendingButtons() {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea,
      ignoreUpvoteIdea, removeSingleIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";
    const ideaLink = `www.fthatnoise.com/${ideaType}s/${idea.id}`;

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

  ignoreButtons() {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete";
    const ideaLink = `www.fthatnoise.com/${ideaType}s/${idea.id}`;

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

  completeButtons() {
    const { idea, ideaType, pendingUpvoteIdea, completeUpvoteIdea, ignoreUpvoteIdea } = this.props;
    const complete = ideaType === "event" ? "Going" : "Complete!";
    const ideaLink = `www.fthatnoise.com/${ideaType}s/${idea.id}`;
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

  creatorButtons() {
    const ideaLink = `www.fthatnoise.com/${this.props.ideaType}s/${this.props.idea.id}`;

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
