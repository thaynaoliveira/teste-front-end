import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../App';
import Home from './Home';
import PageNotFound from './PageNotFound';
import todoApp from '../Reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

let store = createStore(todoApp, applyMiddleware(thunk))

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home} pageName="Home" pageDescription="Initial Page" />
                        <Route path="*" component={PageNotFound} pageName="Page not found" pageDescription="Page not found" />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
