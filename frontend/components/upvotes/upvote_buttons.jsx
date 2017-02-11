import React from 'react';

class UpvoteButtons extends React.Component {
  defaultSuggestionButtons() {
    return (
      <div>
        <button className="button accept-button">Already did it!</button>
        <button className="button accept-button">I'm on it!</button>
        <button className="button ignore-button">Ignore</button>
      </div>
    );
  }

  defaultEventButtons() {
    return (
      <div>
        <button className="button accept-button">Going!</button>
        <button className="button accept-button">Interested</button>
        <button className="button ignore-button">Ignore</button>
      </div>
    );
  }

  render() {
    const { idea, ideaType } = this.props;

    // if (!idea.upvotes_status) {
    //   if (ideaType === 'action') {
    //     return this.defaultSuggestionButtons();
    //   } else {
    //     return this.defaultEventButtons();
    //   }
    // }
    return <h1>Buttons!</h1>;
  }
}

export default UpvoteButtons;

//%w(pending complete ignore going)
