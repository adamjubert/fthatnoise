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
import EventFormContainer from './events/event_form_container';
import ContactFormContainer from './contacts/contact_form_container';
import UserProfileContainer from './users/user_profile_container';
import AboutPage from './static/about';

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

  const SignupForm = (props) => {
    return <SessionFormContainer {...props }/>;
  };

  const LoginForm = (props) => {
    return <SessionFormContainer {...props }/>;
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/actions" />
          <Route path="/signin" component={LoginForm} onEnter={_redirectIfLoggedIn}/>
          <Route path="/signup" component={SignupForm} onEnter={_redirectIfLoggedIn}/>
          <Route path="/actions/:ideaId/edit" component={SuggestionFormContainer} onEnter={_redirectIfLoggedOut} />
          <Route path="/events/:ideaId/edit" component={EventFormContainer} />
          <Route path="/actions/new" component={SuggestionFormContainer} onEnter={_redirectIfLoggedOut} />
          <Route path="/actions" component={SuggestionsIndexContainer} />
          <Route path="/actions/:ideaId" component={SuggestionShowContainer} />
          <Route path="/events" component={EventsIndexContainer} />
          <Route path="/events/new" component={EventFormContainer} />
          <Route path="/events/:ideaId" component={EventShowContainer} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ ContactFormContainer } />
          <Route path="/profile" component={ UserProfileContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
