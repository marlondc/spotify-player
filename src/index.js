import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import Home from './containers/Home';
import Login from './components/Login';
import './stylesheets/App.css';
import songs from './reducers/songs';

const store = createStore(
  combineReducers({
    songs,
    routing: routerReducer,
  }),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(createBrowserHistory()),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path="/user/:accessToken/:refreshToken" component={Home} />
      </div>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
