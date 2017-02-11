import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import App from './app';
import SuggestionsIndexContainer from './suggestions/suggestions_index_container';
import SuggestionShowContainer from './suggestions/suggestion_show_container';
import EventsIndexContainer from './events/events_index_container';
import EventShowContainer from './events/event_show_container';
import SessionFormContainer from './session/session_form_container';
import SuggestionFormContainer from './suggestions/suggestion_form_container';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if (store.getState().session.currentUser) {
      replace({ nextPathname: nextState.location.pathname }, "/");
    }
  };

  const _redirectIfLoggedOut = (nextState, replace) => {
    if (!store.getState().session.currentUser) {
      replace({ nextPathname: nextState.location.pathname }, "/");
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/actions" />
          <Route path="/signin" component={SessionFormContainer} onEnter={_redirectIfLoggedIn}/>
          <Route path="/signup" component={SessionFormContainer} onEnter={_redirectIfLoggedIn}/>
          <Route path="/actions/:ideaId/edit" component={SuggestionFormContainer} onEnter={_redirectIfLoggedOut} />
          <Route path="/actions/new" component={SuggestionFormContainer} onEnter={_redirectIfLoggedOut} />
          <Route path="/actions" component={SuggestionsIndexContainer} />
          <Route path="/actions/:ideaId" component={SuggestionShowContainer} />
          <Route path="/events" component={EventsIndexContainer} />
          <Route path="/events/:ideaId" component={EventShowContainer} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
