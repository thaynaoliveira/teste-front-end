import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../App';
import Home from './Home';
import Video from './Video';
import todoApp from '../Reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Videos from './Videos';

let store = createStore(todoApp, applyMiddleware(thunk))

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home} pageName="Home" pageDescription="Initial Page" />
                        <Route path="videos" component={Videos} pageName="Vídeos" pageDescription="Vídeos" />
                        <Route path="video/:id" component={Video} pageName="Vídeo" pageDescription="Vídeo" />
                        <Route path="*" component={Home} pageName="Home" pageDescription="Home" />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
