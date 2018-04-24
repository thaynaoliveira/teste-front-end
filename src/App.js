import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';

class App extends Component {
    render() {
        const { children, location } = this.props;
        return (
            <div id="app">
                <content>
                    <Header location={location} />
                    {this.props.loading ? <Loading /> : null}
                    {children}
                    <Footer />
                </content>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        loading: state.loading
    };
}

export default connect(mapStateToProps)(App);