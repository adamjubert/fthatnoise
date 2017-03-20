import React from 'react';
import { ShareButtons } from 'react-share';
const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

export const IdeaShareButtons = ({ ideaLink, title }) => {
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
