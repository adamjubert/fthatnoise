import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';

const routes = (
  <Route path="/" component={App}>

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
