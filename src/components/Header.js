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
    
    handleGroupClass() {
        if (this.props.location.pathname == '/videos' && (this.props.videos && this.props.videos.items && this.props.videos.items.length > 0)) {
            return 'search-group--top';
        } else if (this.props.location.pathname.indexOf('/video/') > -1 && (this.props.video && this.props.video.items && this.props.video.items.length > 0)) {
            return 'search-group--top';
        }

        return '';
    }

    renderSearchGroup() {
        return (
            <div className={`search-group ${this.handleGroupClass()}`}>
                <div className="group">
                    <input type="text" value={this.props.videoText} onChange={(e) => this.setVideoText(e)} onKeyUp={(e) => this.checkKey(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Pesquisar</label>
                </div>
                <button className="btn" onClick={(e) => this.pesquisar(e)} disabled={!this.props.videoText}>Buscar</button>
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

    alertClosed(e){
        e.preventDefault();
        let { dispatch } = this.props;
        dispatch(setReducer('ALERT', false));
    }

    handleAlert() {
        if (this.props.showAlert) {
            return (
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={(e) => this.alertClosed(e)}><span aria-hidden="true">&times;</span></button>
                    Ops, algo deu errado! Por favor, tente novamente.
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className={`header ${this.handleHeaderClass()}`}>
                <img src="../images/icasei-logo.svg" onClick={(e) => this.home(e)}/>
                {this.renderSearchGroup()}
                {this.handleAlert()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        videos: state.videos,
        video: state.video,
        videoText: state.videoText,
        showAlert: state.showAlert
    };
}

export default connect(mapStateToProps)(Header);