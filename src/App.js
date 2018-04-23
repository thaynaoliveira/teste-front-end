import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default class App extends Component {
    render() {
        const { children } = this.props;
        return (
            <div id="app">
                <content>
                    <Header />
                    {children}
                    <Footer />
                </content>
            </div>
        );
    }
}