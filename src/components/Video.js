import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideoById } from '../Actions';
import { browserHistory } from 'react-router';

class Video extends Component {

    componentWillMount(){
        if (this.props.routeParams.id) {
            let { dispatch } = this.props;
            dispatch(getVideoById(this.props.routeParams.id));
        }
    }

    voltar(e){
        if (this.props.videos && this.props.videos.items && this.props.videos.items.length > 0){
            browserHistory.push('/videos');
        } else {
            browserHistory.push('/');
        }
    }

    handleDescription(description){
        return description.split('\n').map(
            (item, key) => <span key={key}>{item}<br /></span>
        )
    }

    render() {
        if (this.props.video && this.props.video.items && this.props.video.items.length > 0) {
            return (
                <div className="video">
                    <a onClick={(e) => this.voltar(e)}><i className="glyphicon glyphicon-chevron-left"/> voltar</a>
                    {this.props.video.items.map((item, index) =>
                        <div className="video__item" key={`video-${index}`}>
                            <iframe width="800" height="600" src={`https://www.youtube.com/embed/${item.id}`}></iframe>
                            <div className="video__item__content">
                                <h1>{item.snippet.title}</h1>

                                <p>{this.handleDescription(item.snippet.description)}</p>
                                
                                <div className="video__item__count">
                                    <div>
                                        <img src="../../images/icons/view.png" width="32px" />
                                        <p>{item.statistics.viewCount}</p>
                                    </div>
                                    <div>
                                        <img src="../../images/icons/like.png" width="32px" />
                                        <p>{item.statistics.likeCount}</p>
                                    </div>
                                    <div>
                                        <img src="../../images/icons/dislike.png" width="32px" />
                                        <p>{item.statistics.dislikeCount}</p>
                                    </div>
                                    <div>
                                        <img src="../../images/icons/comment.png" width="32px" />
                                        <p>{item.statistics.commentCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        video: state.video,
        videos: state.videos
    };
}

export default connect(mapStateToProps)(Video);