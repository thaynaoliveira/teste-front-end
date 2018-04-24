import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getVideos, getVideoById, setReducer } from '../Actions';

class Header extends Component {

    setVideoText(e) {
        let { dispatch } = this.props;
        dispatch(setReducer('VIDEO_TEXT', e.target.value));
    }

    checkKey(e){
        if (e.which === 13) { //se for a tecla enter
            this.pesquisar(e);
        }
    }

    pesquisar(e) {
        e.preventDefault();
        let { dispatch } = this.props;
        dispatch(getVideos(this.props.videoText, null));
        browserHistory.push('/videos');
    }
    
    renderSearchGroup() {
        return (
            <div className="search-group">
                <div className="group">
                    <input type="text" value={this.props.videoText} onChange={(e) => this.setVideoText(e)} onKeyUp={(e) => this.checkKey(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>O que está procurando?</label>
                </div>
                <button className="btn" onClick={(e) => this.pesquisar(e)} disabled={!this.props.videoText}>pesquisar</button>
            </div>
        )
    }

    home(e){
        e.preventDefault();
        browserHistory.push('/');
    }

    handleHeaderClass(){
        if (this.props.location.pathname == '/'){
            return 'header--full-height';
        } else if (this.props.location.pathname == '/videos' && !(this.props.videos && this.props.videos.items && this.props.videos.items.length > 0)){
            return 'header--full-height';
        } else if (this.props.location.pathname.indexOf('/video/') > -1 && !(this.props.video && this.props.video.items && this.props.video.items.length > 0)){
            return 'header--full-height';
        }

        return '';
    }

    render() {
        return (
            <div className={`header ${this.handleHeaderClass()}`}>
                <img src="../images/icasei-logo.svg" onClick={(e) => this.home(e)}/>
                {this.renderSearchGroup()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        videos: state.videos,
        video: state.video,
        videoText: state.videoText
    };
}

export default connect(mapStateToProps)(Header);