import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import App from './app';
import SuggestionsIndexContainer from './suggestions/suggestions_index_container';
import SuggestionShowContainer from './suggestions/suggestion_show_container';
import EventsIndexContainer from './events/events_index_container';
import EventShowContainer from './events/event_show_container';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/actions" />
    <Route path="/actions" component={SuggestionsIndexContainer} />
    <Route path="/actions/:ideaId" component={SuggestionShowContainer} />
    <Route path="/events" component={EventsIndexContainer} />
    <Route path="/events/:ideaId" component={EventShowContainer} />
  </Route>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
);

export default Root;
