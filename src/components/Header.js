import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getVideos, getVideoById, setReducer } from '../Actions';

class Header extends Component {

    setVideoText(e) {
        let { dispatch } = this.props;
        dispatch(setReducer('VIDEO_TEXT', e.target.value));
    }

    pesquisar(e) {
        e.preventDefault();
        let { dispatch } = this.props;
        dispatch(getVideos(this.props.videoText, null));
        browserHistory.push('/videos');
    }
    
    renderSearchGroup() {
        return (
            <div className={`search-group ${this.props.videos && this.props.videos.items && this.props.videos.items.length > 0 ? 'search-group--top' : ''}`}>
                <div className="group">
                    <input type="text" value={this.props.videoText} onChange={(e) => this.setVideoText(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>O que está procurando?</label>
                </div>
                <button className="btn" onClick={(e) => this.pesquisar(e)} disabled={!this.props.videoText}>pesquisar</button>
            </div>
        )
    }

    render() {
        return (
            <div className={`header ${!this.props.videos || !this.props.videos.items || this.props.videos.items.length == 0 ? 'header--full-height' : ''}`}>
                <img src="../images/icasei-logo.svg" />
                {this.renderSearchGroup()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        videos: state.videos,
        videoText: state.videoText
    };
}

export default connect(mapStateToProps)(Header);