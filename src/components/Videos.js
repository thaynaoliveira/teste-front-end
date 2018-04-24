import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masker from 'vanilla-masker';
import { browserHistory } from 'react-router';

class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    selectPage(e, page) {
        e.preventDefault();
        let { dispatch } = this.props;
        dispatch(getVideos(this.props.videoText, page));
        $("html, body").animate({ scrollTop: 0 }, 'slow');
    }

    visualizarVideo(e, id){
        browserHistory.push('/video/' + id);
    }

    handleTotal(){
        if (this.props.videos && this.props.videos.pageInfo && this.props.videos.pageInfo.totalResults && this.props.videos.pageInfo.totalResults > 0){
            return `Cerca de ${this.props.videos.pageInfo.totalResults} resultados`;
        }
        return '';
    }

    render() {
        if (this.props.videos && this.props.videos.items && this.props.videos.items.length > 0){
            return (
                <div className="videos">
                    <h1>{this.handleTotal()}</h1>
                    {this.props.videos.items.map((item, index) =>
                        <div className="videos__item" key={`video-${index}`}>
                            <img src={item.snippet.thumbnails.medium.url} width="260px" />
                            <div className="videos__item__info">
                                <h1>{item.snippet.title}</h1>
                                <p>{item.snippet.description}</p>
                                <a onClick={(e) => this.visualizarVideo(e, item.id.videoId)}>visualizar</a>
                            </div>
                        </div>
                    )}

                    <div className="videos__pages">
                        {this.props.videos.prevPageToken ?
                            <button className="btn" onClick={(e) => this.props.selectPage(e, this.props.videos.prevPageToken)}>anterior</button>
                            : null}
                        {this.props.videos.nextPageToken ?
                            <button className="btn" onClick={(e) => this.props.selectPage(e, this.props.videos.nextPageToken)}>próxima</button>
                            : null}
                    </div>
                </div>
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        videos: state.videos,
        video: state.video,
        videoText: state.videoText
    };
}

export default connect(mapStateToProps)(Videos);